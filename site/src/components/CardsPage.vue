<template>
	<v-row>
		<v-col></v-col>
		<v-col>
			<v-card width="600" height="91vh" v-if="setCards" color="#152D56" class="d-flex align-content-start flex-wrap" style="overflow: scroll">
				<v-card width="160" v-for="item in setCards" :key="item.id" class="ma-4" color="green">
	            	<v-img
	                    :src="item.images.small"
	                    width="150"
	                    
	                >
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
    name: 'SetsPage',
    data: () => ({
        setsData: sets.data,
        setCards: [],
        mySets: {},
        mySetID: ''
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
        }
    },
    created() {
        this.mySets = this.$session.get('sets');
        this.mySetID = this.$session.get('currSet')
        axios.get('https://api.pokemontcg.io/v2/cards', {
        	params: {
        		q: "set.id:" + this.mySetID
        	}
        }).then((response) => {
        	console.log(this.mySetID)
        	console.log(response.data.data)
        	this.setCards = response.data.data;
        }).catch((error) => {
        	console.log(error)
        })
    },
};
</script>