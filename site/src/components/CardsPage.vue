<template v-if="isLoaded()">
    <v-row>
        <v-col>
            <v-col></v-col>
            <v-card
                width="600"
                height="765"
                color="#152D56"
                class="mx-auto"
                outlined
            >
                <v-col>
                    <v-card width="580" height="45" color="#0B182C" dark>
                        <v-text-field width="580" label="Card Search" v-model="searchText"></v-text-field>
                    </v-card>
                    <v-card
                        width="580"
                        height="300"
                        class="mx-auto mt-3"
                        color="#0B182C"
                    >
                        <v-col>
                            <v-img
                                :src="getSetLogo()"
                                v-if="isLoaded()"
                                :width="getLogoWidth()"
                                class="mx-auto"
                            >
                            </v-img>
                        </v-col>
                        <v-col></v-col>
                    </v-card>
                    <v-col></v-col>
                    <v-card
                        width="580"
                        height="367"
                        class="mx-auto"
                        color="#03B8E9"
                    >
                        <v-row>
                            <h1 class="mx-auto">
                                {{ getCardCount() }} / {{ currentSetCardCount }}
                            </h1>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-card color="#0B182C" class="ml-3" dark>
                                    <v-card-title
                                        >Nurse Joy's Advice</v-card-title
                                    >
                                    <v-card-text>
                                        Your card completion status is displayed
                                        above.
                                        <br /><br />
                                        Cards marked with a red banner mean they
                                        are not yet owned. Cards marked with a
                                        green banner mean they are in your
                                        collection already.
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="4">
                                <v-img
                                    :src="require('../assets/joy.png')"
                                    class="mt-11"
                                ></v-img>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-card>
            <v-col></v-col>
            <v-row>
                <v-btn
                    width="600"
                    class="mx-auto"
                    color="#DA3B24"
                    @click="routeToSets()"
                >
                    <v-icon left> mdi-arrow-left </v-icon>
                    Return to Set List
                </v-btn>
            </v-row>
        </v-col>
        <v-col>
            <v-col></v-col>
            <v-card
                width="600"
                height="85vh"
                v-if="isLoaded()"
                color="#152D56"
                class="d-flex align-content-start flex-wrap my-auto"
                style="overflow-y: scroll"
                outlined
            >
                <v-dialog v-model="dialog" v-if="isLoaded()" persistent dark>
                    <v-card height="609" width="600" class="mx-auto" shaped>
                        <v-card-title :key="myCard.id">{{
                            myCard.name
                        }}</v-card-title>
                        <v-row>
                            <v-col cols="8">
                                <v-img
                                    :src="myCard.images.large"
                                    class="ma-auto"
                                ></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-card-text>
                                    <h1>#{{ myCard.number }}</h1>
                                    <v-divider color="white"></v-divider>
                                    <br />
                                    <h3>Rarity: {{ myCard.rarity }}</h3>
                                    <v-divider color="white"></v-divider>
                                    <br />
                                    <h3>Artist:</h3>
                                    <h3>{{ myCard.artist }}</h3>
                                    <v-divider color="white"></v-divider>
                                    <br />
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        color="#03B8E9"
                                        v-on:click="addCard(myCard.id)"
                                        v-if="!hasCard(myCard.id)"
                                        >Add</v-btn
                                    >
                                    <v-btn
                                        color="#DA3B24"
                                        v-on:click="removeCard(myCard.id)"
                                        v-if="hasCard(myCard.id)"
                                        >Remove</v-btn
                                    >
                                    <v-btn
                                        color="#152D56"
                                        v-on:click="closeDialog()"
                                        >Close</v-btn
                                    >
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-dialog>

                <v-card
                    width="160"
                    :key="item.id"
                    class="ma-4"
                    :color="doesOwn(item.id)"
                    v-for="item in setSearchedCards"
                    v-on:click="openDialog(item)"
                >
                    <v-img :src="item.images.small" width="150" :key="item.id">
                    </v-img>
                </v-card>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
const sets = require('../../../data/sets.json');
const axios = require('axios').default;
export default {
    name: 'CardsPage',
    data: () => ({
        setsData: sets.data,
        setCards: null,
        mySets: null,
        mySetID: null,
        setLogoHeight: 280,
        bigCardHeight: 120,
        currentSetCardCount: 0,
        myCard: {
            id: 'none',
            name: 'none',
            artist: 'none',
            number: 0,
            images: {
                small: sets.data[0].images.symbol,
                large: sets.data[0].images.symbol,
            },
        },
        dialog: false,
        username: null,
        searchText: '',
    }),
    methods: {
        getCardCount() {
            return this.mySets[this.mySetID].length;
        },
        getSetCardCount() {
            for (const set in this.setsData) {
                if (this.setsData[set].id === this.mySetID) {
                    return this.setsData[set].total;
                }
            }
            return 0;
        },
        logout() {
            this.$session.clear();
            // Redirect to login
        },
        routeToSets() {
            this.$session.remove('currSet');
            this.$router.push('/sets');
        },
        doesOwn(itemID) {
            for (const card in this.mySets[this.mySetID]) {
                if (this.mySets[this.mySetID][card] == itemID) {
                    return 'green';
                }
            }
            return 'red';
        },
        getSetLogo() {
            for (const set in this.setsData) {
                if (this.setsData[set].id === this.mySetID) {
                    return this.setsData[set].images.logo;
                }
            }
            return 'https://images.pokemontcg.io/base1/logo.png';
        },
        isLoaded() {
            if (
                this.setsData &&
                this.setcards &&
                this.mySets &&
                this.mySetID &&
                this.myCard
            ) {
                return false;
            }
            return true;
        },
        loadCards() {
            axios
                .get('https://api.pokemontcg.io/v2/cards', {
                    params: {
                        q: 'set.id:' + this.mySetID,
                    },
                })
                .then((response) => {
                    this.setCards = response.data.data;
                    this.myCard = this.setCards[0];
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getLogoWidth() {
            for (const set in this.setsData) {
                if (this.setsData[set].id === this.mySetID) {
                    return (
                        (this.setsData[set].images.logoWidth /
                            this.setsData[set].images.logoHeight) *
                        this.setLogoHeight
                    );
                }
            }
        },
        hasCard(cardID) {
            if (this.doesOwn(cardID) == 'red') {
                return false;
            } else {
                return true;
            }
        },
        addCard(cardID) {
            this.mySets[this.mySetID].push(cardID);
            this.$session.set('sets', this.mySets);
            axios
                .post(
                    'http://198.199.67.109:3000/api/update',
                    { sets: this.mySets },
                    {
                        params: {
                            username: this.username,
                            sets: this.mySets,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        },
        removeCard(cardID) {
            const pos = this.mySets[this.mySetID].indexOf(cardID);
            if (pos > -1) {
                this.mySets[this.mySetID].splice(pos, 1);
            }
            this.$session.set('sets', this.mySets);
            axios
                .post(
                    'http://198.199.67.109:3000/api/update',
                    { sets: this.mySets },
                    {
                        params: {
                            username: this.username,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    alert('Failed to Reach Server');
                });
        },
        isSearched(setName) {
            var name = setName.toLowerCase()
            var search = this.searchText.toLowerCase()
            return name.includes(search)
        },
        openDialog(card) {
            this.myCard = card;
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
    },
    computed: {
        setSearchedCards: function() {
            return this.setCards.filter(i => i.name.toLowerCase().includes(this.searchText.toLowerCase()))
        }
    },
    created() {
        this.mySets = this.$session.get('sets');
        this.mySetID = this.$session.get('currSet');
        this.username = this.$session.get('username');
        this.setsData = sets.data;
        this.currentSetCardCount = this.getSetCardCount();
        this.loadCards();
    },
};
</script>
