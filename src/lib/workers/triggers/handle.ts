import type { LayoutData } from "../../../routes/_/$types";
import { getProperty } from 'dot-prop';
import { escape } from 'lodash-es';
import { action } from "./action";

export const satisfiesConditions = ( conditions: PrismaJson.TriggerCondition[], data: AllSubscriptions ) => {
    /**
     * Always return true if there are no conditions to meet
     */
    if( ! conditions || conditions.length === 0 ) {
        return true;
    }

    let ifCondition = '';

    for( const condition of conditions ) {
        const filter = getProperty( data.payload.event, condition.field ) as string;

        if( ! filter ) {
            return false;
        }
        
        if( condition.filter === 'any' ) {
            return true;
        }

        if( condition.operator ) {
            ifCondition += ` ${ condition.operator } `;
        }

        if( condition.filter === 'startsWith' ) {
            ifCondition += `'${ escape( filter ) }'.startsWith( '${ escape( condition.value ) }' )`;
        }

        if( condition.filter === 'equals' ) {
            ifCondition += `'${ escape( filter ) }' === '${ escape( condition.value ) }'`;
        }

        if( condition.filter === 'contains' ) {
            ifCondition += `'${ escape( filter ) }'.includes( '${ escape( condition.value ) }' )`;
        }
    }

    return !! Function( `return ${ ifCondition };` )();
}

export const handle = async ( triggers: LayoutData['triggers'], data: AllSubscriptions ) => {
    for await( const trigger of triggers ) {
        if( ! satisfiesConditions( trigger.conditions as PrismaJson.TriggerCondition[], data ) ) {
            /**
             * Did not satisfy condition, move to next condition
             */
            continue;
        }

        /**
         * If we get here, all conditions are met, execute action
         */
        for await( const ac of trigger.actions ) {
            await action( ac.data as TriggerActions, data );
        }
    }
}