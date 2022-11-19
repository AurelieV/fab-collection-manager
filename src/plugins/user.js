import { watch } from 'vue'
import { getProfile, watchSession } from '/src/helpers/user'
import { useUserStore } from '/src/stores/user'

export default function userPlugin(app, { router }) {
  const userStore = useUserStore()

  router.beforeEach(async (to) => {
    if (to.meta.auth || to.meta.roles) {
      const isAuthent = await getIsAuthenticated()
      if (!isAuthent) {
        return {
          name: 'login',
          query: { redirect_uri: to.fullPath },
        }
      }
    }
  })

  watchSession(async (session) => {
    if (session) {
      const userId = session.user.id
      const profile = await getProfile(userId)
      userStore.$state = {
        id: session.user.id,
        profile,
      }
    } else {
      userStore.$state = { id: null }
    }
  })
}

function getIsAuthenticated() {
  const userStore = useUserStore()
  if (userStore.id !== undefined) {
    return Promise.resolve(userStore.id !== null)
  } else {
    return new Promise((resolve) => {
      const unwatch = watch(
        () => userStore.id,
        (id) => {
          if (id !== undefined) {
            resolve(userStore.id !== null)
            unwatch()
          }
        }
      )
    })
  }
}
