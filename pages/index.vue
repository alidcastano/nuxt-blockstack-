<template>
  <section class="container">
    <button @click.prevent="signIn"> Sign In With Blockstack </button>
  </section>
</template>

<script>
export default {
  methods: {
    signIn () {
      this.$signInAndRedirect('/dashboard')
    }
  }
}
</script>
