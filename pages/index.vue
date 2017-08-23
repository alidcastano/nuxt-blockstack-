<template>
  <section class="container">
    <button @click.prevent="signIn"> Sign In With Blockstack </button>
  </section>
</template>

<script>
export default {
  methods: {
    signIn () {
      // this.blockstack.redirectToSignIn()
      this.blockstack.redirectToSignInWithAuthRequest(
        this.blockstack.makeAuthRequest(
          this.blockstack.generateAndStoreAppKey(),
          window.location.origin,
          window.location.origin + '/manifest.json'
        )
      )
    }
  }
}
</script>
