import EventEmitter from 'eventemitter3';
import rangy from 'rangy';

export type ContentEditableChar = {
    char?: string | undefined;
    code?: number | undefined;
}

type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export type ContentEditableEvents = {
    'update': ( ce: ContentEditable ) => void;
    'change': ( ce: ContentEditable ) => void;
    'keydown': ( e: KeyboardEvent, ce: ContentEditable ) => void;
    'keyup': ( e: KeyboardEvent, ce: ContentEditable ) => void;
}

export function getCaretOffsetWithin(element: HTMLElement | Node): number {
    let caretOffset = 0;
    const doc = element.ownerDocument;
    const win = doc?.defaultView;

    if( ! win ) {
        return caretOffset;
    }

    if (win.getSelection) {
        const selection = win.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((doc as any).selection) {
        const selection = (doc as any).selection;
        if (selection.type !== "Control") {
            const textRange = selection.createRange();
            // @ts-ignore
            const preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
    }
    return caretOffset;
}

export class ContentEditable extends EventEmitter<ContentEditableEvents> {
    public previousCaretOffset: number = 0;

    public currentCaretOffset: number = 0;

    public currentTextNode!: Text;

    constructor( readonly element: HTMLDivElement ) {
        super();

        element.addEventListener( 'keyup', this.keyup.bind( this ) );
        element.addEventListener( 'keydown', this.keydown.bind( this ) );
        element.addEventListener( 'click', this.onFocus.bind( this ) );        

        let oldValue = this.value;
        const int = setInterval(() => {
            if( this.value !== oldValue ) {
                this.emit( 'change', this );
            }

            if( this.element.isConnected === false ) {
                clearInterval( int );
            }

            oldValue = this.value;
        }, 50 )

        this.updateState();
    }

    onFocus( event: FocusEvent ) {
        if( ! this.selection || ! this.range ) {
            return;
        }
        
        this.updateState();
    }

    keyup( event: KeyboardEvent ) {
        if( ! this.range || ! this.selection ) {
            return;
        }

        if( event.key === 'Escape' ) {
            if( this.selection.anchorNode?.textContent === '\u200B' ) {
                this.selection.anchorNode.parentNode?.removeChild( this.selection.anchorNode );
            }
        }

        this.updateState();
        this.emit( 'keyup', event, this );
    }

    keydown( event: KeyboardEvent ) {
        this.emit( 'keydown', event, this );
    }

    updateState() {
        if( ! this.range || ! this.selection ) {
            return;
        }

        this.previousCaretOffset = this.currentCaretOffset;
        this.currentCaretOffset = this.selection.anchorOffset;
        
        if( this.selection?.anchorNode?.nodeType === Node.TEXT_NODE ) {
            this.currentTextNode = this.selection.anchorNode as Text;
        } else {
            let node = this.selection.anchorNode?.firstChild;
            
            if( this.selection.anchorNode?.nodeName === 'DIV' ) {
                node = node?.firstChild;
            }

            while( node ) {
                if( node.nodeType === Node.TEXT_NODE ) {
                    this.currentTextNode = node as Text;
                    break;
                }

                node = node.nextSibling;
            }
        }

        this.emit( 'update', this );
    }

    insert( node: Node ) {
        if( ! node.textContent || node.textContent === '' ) {
            node.textContent = '\u200B';
        }

        if( ! this.range || ! this.selection ) {
            return;
        }

        this.range.deleteContents();
        this.range.insertNode( node );
        
        this.updateState();
        this.setRange( 1, 1, node );
    }

    select( start: number, end: number ) {
        if( ! this.selection ) {
            return;
        }
        
        this.setRange( start, end );
    }

    setRange( start: number, end: number, node?: Node ) {
        if( ! this.selection ) {
            return;
        }
        
        const range = document.createRange();

        range.setStart( node || this.currentTextNode, start );
        range.setEnd( node || this.currentTextNode, end );

        this.selection.removeAllRanges();
        this.selection.addRange( range );
    }

    wrap( node: Node ) {
        if( ! this.range || ! this.selection ) {
            return;
        }

        node.appendChild( this.range.extractContents() );

        this.range.insertNode( node );
        this.setRange( 1, 1, node );
        this.updateState();
    }

    moveCaret( offset: number ) {
        if( ! this.selection || ! this.range ) {
            return;
        }

        if( offset < 0 && this.selection.rangeCount < 1 && this.range.startOffset < 1 ) {
            return;
        }

        if( offset > 0  && this.selection.rangeCount > 0 && this.currentTextNode.textContent?.length === 0 ) {
            return;
        }

        let node: ChildNode | null | undefined = null;
        offset = getCaretOffsetWithin( this.currentTextNode ) + offset;

        // The current offset moves out of the current TextNode
        // Move to next TextNode
        if( offset > this.currentTextNode.textContent!.length ) {
            node = this.currentTextNode.parentNode!.nextSibling?.nextSibling;
            offset = 0;
            
            if( node ) {
                this.range.setStartAfter( node );
                this.range.collapse(true);
            }

            return;
        }

        this.range.setStart( node || this.currentTextNode, offset );
        this.range.setEnd( node || this.currentTextNode, offset );
    }

    charAt( pos: number ) {
        const char = this.element.textContent?.charAt( pos );
        const code = this.element.textContent?.charCodeAt( pos );

        if( ! char || ! code ) {
            return null;
        }

        return {
            char,
            code
        }
    }

    charAtCaret( side: 'left' | 'right' ) {
        return this.charAt( getCaretOffsetWithin( this.element ) + ( side === 'left' ? -1 : 0  ) )
    }

    get caretChar() {
        return {
            left: this.charAtCaret( 'left' ),
            right: this.charAtCaret( 'right' )
        }
    }

    get value() {
        return this.element.textContent;
    }

    get selection() {
        return window.getSelection();
    }

    get range() {
        try {
            return this.selection?.getRangeAt( 0 )
        } catch (_) {
            return null;
        }
    }
}