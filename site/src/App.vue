<template>
    <v-app style="background: #161618">
        <v-app-bar app color="#DA3B24" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
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
    computed: {
        cssTheme() {
            const out = {};
            for (const name of Object.keys(this.$vuetify.theme.themes.dark)) {
                out[`--v-color-dark-${name}`] = this.$vuetify.theme.themes.dark[name];
                out[`--v-color-light-${name}`] = this.$vuetify.theme.themes.light[name];
                out[`--v-color-${name}`] = this.$vuetify.theme.isDark ?
                this.$vuetify.theme.themes.dark[name] :
                this.$vuetify.theme.themes.light[name]
            }
            out[`--v-text-color-${name}`] = this.$vuetify.theme.isDark ?
                'white' : 'black'
            return out;
        }
    },
    name: 'App',

    data: () => ({
        //
    }),
};
</script>
