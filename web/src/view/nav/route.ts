/**
 * All of our CC URL routes. You may navigate to any route by providing the route
 * and an argument specifying all it's route params, e.g. { taskId: 1, contactId: 3}.
 *
 * Some routes are special values that map to one of the other routes depending on current location context.
 */
export enum Route {
  HOME = 'app/index',
  LECTURES = 'app/lectures',
  PROJECTS = 'app/projects',
  PLAYGROUND = 'app/playground',
  PLAYGROUND_APP = 'app/playground/:app',
  CREATE_FORM = 'app/createevent',
  MAP = 'app/event',
  LOGIN_SIGNUP = 'app/account/',
  LOGIN_SIGNUP_APP = 'app/account/:form',
  FIND_EVENT = 'app/findevent',
  CREATE_TABLE_FORM = 'app/createtable'
}

export enum PlaygroundApp {
  SURVEYS = 'surveys',
  LOGIN = 'login',
  SIGNUP = 'signup'
}

export enum AccountApp {
  LOGIN = 'login',
  SIGNUP = 'signup',
  PROFILE = 'profile',
  CHAT = 'chat'
}

export function getEventPath(eventID?: number) {
  const path = getPath(Route.FIND_EVENT)
  return path + (eventID ? `?eventID=${eventID}` : '')
}

export function getSurveyPath(surveyId?: number) {
  const path = getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.SURVEYS })
  return path + (surveyId ? `?surveyId=${surveyId}` : '')
}

export function getLoginPath() {
  return getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.LOGIN })
}

export function getSignupPath() {
  return getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.SIGNUP })
}

export function getProfilePath() {
  return getPath(Route.LOGIN_SIGNUP_APP, { form: AccountApp.PROFILE })
}

export function getChatPath() {
  return getPath(Route.LOGIN_SIGNUP_APP, { form: AccountApp.CHAT })
}

export function getLoginPathTwo() {
  return getPath(Route.LOGIN_SIGNUP_APP, { form: AccountApp.LOGIN })
}

export function getSignupPathTwo() {
  return getPath(Route.LOGIN_SIGNUP_APP, { form: AccountApp.SIGNUP })
}

export function getPlaygroundPath() {
  return getPath(Route.PLAYGROUND)
}

export function getEventCreateFormPath() {
  return getPath(Route.CREATE_FORM)
}

export function getEventTableCreateFormPath() {
  return getPath(Route.CREATE_TABLE_FORM)
}
/**
 * Example: getPath(ROUTES.TASK) returns "/leasing/tasks" while getPath(ROUTES.TASK, {taskId: 5}) returns "leasing/tasks/task/5".
 *
 * CAVEAT: currently this reads from window.location, the appropriate way to get location is through @reach/router.
 */
export function getPath(route: Route, arg?: Partial<ReturnType<typeof routeParams>>) {
  const routes = [route] as Route[]

  for (const r of routes) {
    const params = r.split('/').filter(t => t.startsWith(':'))
    const keys = arg ? Object.keys(arg) : []
    const paramMatches = params.map(p => keys.includes(p.replace(':', ''))).filter(m => m)
    if (keys.length !== params.length || paramMatches.length < params.length) {
      continue // every parameter must be replaced
    }

    // matching case: arg specifies all params in the URL
    let path = r.toString()
    for (const k of keys) {
      path = path.replace(':' + k, '' + (arg as any)[k])
    }
    return '/' + path
  }

  throw new Error('no matching route')
}

/**
 * Represents parameters parsed from URL routes, e.g. /leasing/tasks/task/123 parses taskId=123.
 */
export interface AppRouteParams {
  userId?: string
  app?: PlaygroundApp
  form?: AccountApp
}

/**
 * Parses string route params into numbers. Values are 0 where undefined. Useful for converting URL parameters into GraphQL query variables.
 */
export function routeParams(params: AppRouteParams) {
  return {
    userId: Number(params.userId || 0),
    app: params.app,
    form: params.form
  }
}
