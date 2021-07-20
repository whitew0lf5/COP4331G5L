<template>
    <v-row>
        <v-row> </v-row>
        <v-row>
            <v-card
                class="my-auto mr-16"
                width="800"
                height="700"
                color="#152D56"
            >
                <v-card
                    class="mx-auto mt-5"
                    width="780"
                    height="270"
                    color="#0B182C"
                    dark
                >
                    <v-row>
                        <v-col cols="8">
                            <v-card-title>How to Use</v-card-title>
                            <v-card-text>
                                Use the Pokemon Card Set Selector on the right
                                to locate the set you would like to browse.
                                <br /><br />
                                Once you have located a card, click to expand
                                the view and simply toggle the "Owned" check-box
                                to add or remove the card from your collection.
                            </v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-img
                                :src="require('../assets/charizardcard.png')"
                                width="200"
                                class="ml-14 mt-0"
                            ></v-img>
                        </v-col>
                    </v-row>
                </v-card>
                <v-img
                    :src="require('../assets/pkmportrait.jpg')"
                    width="780"
                    height="400"
                    class="mx-auto mt-3"
                ></v-img>
            </v-card>
            <v-col>
                <v-card class="mr-10 ml-16" width="400" color="#152D56" dark>
                    <v-virtual-scroll
                        bench="15"
                        :items="setsData"
                        height="91vh"
                        width="400"
                        class="mx-auto"
                        item-height="150"
                    >
                        <template v-slot:default="{ item }" class="ma-auto">
                            <v-col align="center">
                                <label class="mx-auto"
                                    >{{ item.name }}
                                    {{ getCardCount(item.id) }}/{{
                                        item.total
                                    }}</label
                                >
                                <v-card
                                    width="400"
                                    height="height"
                                    color="#294673"
                                    v-on:click="routeToCards(item.id)"
                                >
                                    <v-img
                                        :src="item.images.logo"
                                        :key="item.id"
                                        :width="
                                            (item.images.logoWidth /
                                                item.images.logoHeight) *
                                            height
                                        "
                                        height="height"
                                        class="ma-auto"
                                    >
                                    </v-img>
                                </v-card>
                                <v-divider color="white"></v-divider>
                            </v-col>
                        </template>
                    </v-virtual-scroll>
                </v-card>
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
const sets = require('../../../data/sets.json');
export default {
    name: 'SetsPage',
    data: () => ({
        setsData: sets.data,
        height: 120,
        mySets: {},
        username: null,
    }),
    methods: {
        getCardCount(setID) {
            return this.mySets[setID].length;
        },
        logout() {
            this.$session.clear();
            // Redirect to login
        },
        routeToCards(setID) {
            console.log(setID);
            this.$session.set('currSet', setID);
            this.$router.push('/cards');
        },
    },
    created() {
        this.mySets = this.$session.get('sets');
        this.username = this.$session.get('username');
    },
};
</script>
