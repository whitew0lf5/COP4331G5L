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
                <v-card class="mr-10 ml-16" width="400" color="#152D56">
                    <v-virtual-scroll
                        bench="15"
                        :items="mySets"
                        height="91vh"
                        width="400"
                        class="mx-auto"
                        item-height="150"
                    >
                        <template v-slot:default="{ item }" class="ma-auto">
                            <v-col align="center">
                                <label class="mx-auto">{{ item.name }}</label>
                                <router-link
                                    :to="{
                                        path: '/cards',
                                        params: { setID: item.id },
                                    }"
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
                                </router-link>
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
        mySets: sets.data,
        height: 120,
    }),
    methods: {
        getHeight(url, callback) {
            var img = new Image();
            img.src = url;
            img.onload = function () {
                callback(this.height);
            };
        },
        getWidth(url) {
            var img = new Image();
            img.src = url;
            img.onload = function () {
                console.log((this.width / this.height) * 240);
            };
            return 200;
        },
        getAspectRatio(url, callback) {
            var img = new Image();
            img.src = url;
            img.onload = function () {
                callback(this.width, this.height);
            };
        },
    },
    mounted() {
        console.log(this.mySets);
    },
};
</script>
