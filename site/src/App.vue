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
                    Dream Team Games Card Collection Manager
                </h1>
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({
        //
    }),
};
</script>

<style>
#app {
    background: url('./assets/bluebg.jpg');
    background-size: cover;
}
</style>
