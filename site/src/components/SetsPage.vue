<template>
    <v-row>
        <v-row> </v-row>
        <v-row>
            <v-col>
                <v-card width="800" height="45" class="my-auto" color="#0B182C" dark>
                    <v-text-field width="400" label="Set Name Search" v-model="searchText"></v-text-field>
                </v-card>
                <v-col></v-col>
                <v-col></v-col>
            <v-card
                class="my-auto mr-16"
                width="800"
                height="700"
                color="#152D56"
            >
            <v-col>
                <v-card
                    class="mx-auto mt-3"
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
            </v-col>
                <v-img
                    :src="require('../assets/pkmportrait.jpg')"
                    width="780"
                    height="395"
                    class="mx-auto"
                ></v-img>
            </v-card>
        </v-col>
            <v-col>
                <v-card width="400" height="85vh" color="#152D56" class="d-flex align-content-start flex-wrap my-auto"
                style="overflow-y: scroll" dark>
                <v-col>
                                
                                <v-card
                                    class="my-2 mx-auto"
                                    width="400"
                                    height="height"
                                    color="#294673"
                                    v-for="item in setsSearchedData"
                                    :key="item.id"
                                    v-on:click="routeToCards(item.id)"
                                    outlined
                                >
                                <label>{{ item.name }}
                                    {{ getCardCount(item.id) }}/{{
                                        item.total
                                    }}</label
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
                                </v-col>
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
        searchText: '',
    }),
    methods: {
        getCardCount(setID) {
            return this.mySets[setID].length;
        },
        routeToCards(setID) {
            console.log(setID);
            this.$session.set('currSet', setID);
            this.$router.push('/cards');
        }
    },
    computed: {
        setsSearchedData: function() {
            return this.setsData.filter(i => i.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    created() {
        this.mySets = this.$session.get('sets');
        console.log("Looking at my sets")
        console.log(this.mySets);
        this.username = this.$session.get('username');
    },
};
</script>
