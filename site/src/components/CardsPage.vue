<template v-if="isLoaded()">
	<v-row>
		<v-row></v-row>
		<v-row v-if="setCards">
			<v-card width="600" height="700" color="#152D56" class="mr-16">
					<v-card width="580" height="300" class="mx-auto mt-2" color="#0B182C">
						<v-img :src="getSetLogo()" v-if="isLoaded()">
						</v-img>
					</v-card>
			</v-card>
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
    name: 'SetsPage',
    data: () => ({
        setsData: sets.data,
        setCards: null,
        mySets: null,
        mySetID: null
    }),
    methods: {
        getCardCount() {
            return this.mySets[this.mySetID].length
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
        		if (set.id === this.mySetID) {
        			return set.images.logo
        		}
        	}
        	return "https://images.pokemontcg.io/base1/logo.png"
        },
        isLoaded() {
        	console.log("Checking if all data is loaded:")
        	console.log(this.setsData)
        	console.log(this.setcards)
        	console.log(this.mySets)
        	console.log(this.mySetID)
        	if (this.setsData === null || this.setcards === null || this.mySets === null || this.mySetID === null) {
        		return false
        	}
        	return true
        },
        loadCards() {
        	console.log("Set ID at AXios runtime: " + this.mySetID)
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
        }
    },
    created() {
        this.mySets = this.$session.get('sets');
        this.mySetID = this.$session.get('currSet');
        this.loadCards();
    },
    mounted() {
    	console.log("Logging data at mounted")
    	console.log(this.setCards)
    	console.log(this.mySets)
    	console.log(this.mySetID)
    }
};
</script>