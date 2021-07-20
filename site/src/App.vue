<template>
    <v-app>
        <v-app-bar app color="#DA3B24" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Pokeball icon"
                    class="shrink mr-2"
                    contain
                    :src="require('./assets/pokeball.svg')"
                    transition="scale-transition"
                    width="40"
                />

                <h1 class="display-1 font-weight-bold">
                    Dream Team Card Manager
                </h1>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0B182C"
                v-if="hideLogout()"
                v-on:click="performLogout()"
                >Logout</v-btn
            >
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({}),
    methods: {
        hideLogout() {
            if (
                this.$route.name == 'Login' ||
                this.$route.name == 'Verify' ||
                this.$route.name == 'Reset'
            ) {
                return false;
            } else {
                return true;
            }
        },
        performLogout() {
            this.$router.push('/');
        },
    },
};
</script>

<style>
#app {
    background: url('./assets/bluebg.jpg');
    background-size: cover;
}

html {
    overflow: hidden !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

html::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
