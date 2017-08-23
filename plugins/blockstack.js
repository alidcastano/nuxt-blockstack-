import Vue from 'vue'
import * as blockstack from 'blockstack'
import storage from 'blockstack-storage'

const { join } = require('path')
const fixPath = (str) => join('/', str)


export default { ...blockstack, storage }

export const signInAndRedirect = function (redirectPath = '/') {
  const origin = window.location.origin
  const appKey = blockstack.generateAndStoreAppKey()
  const redirectUri = origin + fixPath(redirectPath)
  const manifestUri = process.env.STATIC ? `${origin}/manifest.json` : `${origin}/api/manifest.json`
  const authReq = blockstack.makeAuthRequest(appKey, redirectUri, manifestUri)
  blockstack.redirectToSignInWithAuthRequest(authReq)
}

export const autoSignInAndRedirect = async function (redirectPath) {
   if (blockstack.isUserSignedIn()) {
     goToPath(redirectPath)
   } else if (blockstack.isSignInPending()) {
     await blockstack.handlePendingSignIn()
     goToPath(redirectPath)
   } else {
     this.signInAndRedirect(redirectPath)
   }
}

export const loadUser = async function () {
  if (blockstack.isUserSignedIn()) {
    return blockstack.loadUserData()
  } else if (blockstack.isSignInPending()) {
    await blockstack.handlePendingSignIn()
    return blockstack.loadUserData()
  } else {
    window.location = window.location.origin
  }
}

Vue.use((vm) => {
  if (vm.__blockstack_installed__) return
  vm.prototype.$blockstack = { ...blockstack, storage }
  vm.prototype.$signInAndRedirect = signInAndRedirect
  vm.prototype.$autoSignInAndRedirect = autoSignInAndRedirect
  vm.prototype.$loadUser = loadUser
  vm.__blockstack_installed__ = true
})

function goToPath(redirectPath = null) {
  if (!redirectPath) return

  const path = fixPath(redirectPath)
  if (window.location.pathname === path) return

  window.location = window.location.origin + path
}
