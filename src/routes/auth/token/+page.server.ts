import { exchangeCode } from '@twurple/auth';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');

    if( ! code ) {
        error(400, 'Authentication failed');
    }

    const tokenData = await exchangeCode( CLIENT_ID, CLIENT_SECRET, code, REDIRECT_URI );

    cookies.set('token', JSON.stringify( tokenData ), {
        path: '/'
    })

    redirect(302, '/auth/login');
}