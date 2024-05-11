/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import SessionController from '#controllers/session_controller'
import { middleware } from './kernel.js'

router
    .group(() => {
        router.get('redirect', [SessionController, 'redirect'])
        router.get('token', [SessionController, 'authenticate'])
        router.get('me', [SessionController, 'me']).use( middleware.auth() )
    })
    .prefix('/auth')