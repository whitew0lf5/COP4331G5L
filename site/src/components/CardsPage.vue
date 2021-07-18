<template v-if="isLoaded()">
	<v-row>
		<v-row></v-row>
		<v-row v-if="setCards">
			<v-col>
			<v-card width="600" height="700" color="#152D56" class="mr-16">
				<v-col>
					<v-card width="580" height="300" class="mx-auto" color="#0B182C">
						<v-col>
							<v-img :src="getSetLogo()" v-if="isLoaded()" :width="getLogoWidth()" class="ma-auto">
							</v-img>
						</v-col>
					</v-card>
				</v-col>
					<v-card width="580" height="369" class="mx-auto mt-2" color="#03B8E9">
						<v-row>
							<h1 class="mx-auto">{{ getCardCount() }} / {{ currentSetCardCount }}</h1>
						</v-row>
						<v-row>
						<v-col cols="6">
						<v-card-title>Nurse Joy's Advice</v-card-title>
                            <v-card-text>
                                Your card completion status is displayed above.
                                <br /><br />
                                Cards marked with a red banner mean they are not yet owned. Cards marked with a green banner mean they are in your collection already.
                            </v-card-text>
                        </v-col>
                        <v-col cols="4">
                        	<v-img :src="require('../assets/joy.png')" class="mt-11"></v-img>
                        </v-col>
                    </v-row>
					</v-card>
			</v-card>
		</v-col>
		<v-col>
			<v-card width="600" height="91vh" v-if="isLoaded()" color="#152D56" class="d-flex align-content-start flex-wrap my-auto" style="overflow-y: scroll">
				<v-card width="160" v-for="item in setCards" :key="item.id" class="ma-4" :color="doesOwn(item.id)">
	            	<v-img
	                    :src="item.images.small"
	                    width="150"
	                    
	                >
	            	</v-img>
	            </v-card>
			</v-card>
		</v-col>
	</v-row>
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
        currentSetCardCount: 0
    }),
    methods: {
        getCardCount() {
            return this.mySets[this.mySetID].length
        },
        getSetCardCount() {
        	for (const set in this.setsData) {
        		if (this.setsData[set].id === this.mySetID) {
        			return this.setsData[set].total
        		}
        	}
        	return 0;
        },
        logout() {
            this.$session.clear()
            // Redirect to login
        },
        routeToSets(setID) {// https://api.pokemontcg.io/v2/cards?q=set.id:swsh5
            console.log(setID)
            this.$session.remove('currSet')
        },
        doesOwn(itemID) {
        	for (const card in this.mySets[this.mySetID]) {
        		if (card.id == itemID) {
        			return "green"
        		}
        	}
        	return "red"
        },
        getSetLogo() {
        	for (const set in this.setsData) {
        		if (this.setsData[set].id === this.mySetID) {
        			return this.setsData[set].images.logo
        		}
        	}
        	return "https://images.pokemontcg.io/base1/logo.png"
        },
        isLoaded() {
        	if (this.setsData && this.setcards && this.mySets && this.mySetID) {
        		return false
        	}
        	return true
        },
        loadCards() {
        	axios.get('https://api.pokemontcg.io/v2/cards', {
        	params: {
        		q: "set.id:" + this.mySetID
        	}
	        }).then((response) => {
	        	console.log("Axios Data:")
	        	console.log(response.data.data)
	        	this.setCards = response.data.data;
	        }).catch((error) => {
	        	console.log(error)
	        })
        },
        getLogoWidth() {
        	for (const set in this.setsData) {
        		if (this.setsData[set].id === this.mySetID) {
        			return (this.setsData[set].images.logoWidth / this.setsData[set].images.logoHeight) * this.setLogoHeight
        		}
        	}
        }
    },
    created() {
        this.mySets = this.$session.get('sets');
        this.mySetID = this.$session.get('currSet');
        this.setsData = sets.data;
        this.currentSetCardCount = this.getSetCardCount();
        this.loadCards();
    }
};
</script>