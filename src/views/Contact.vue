<template>
  <div class="contact">
    <b-row>
      <b-col md="12">
        <h3>My Contact</h3>
      </b-col>
      <b-col md="6" v-for="(item, index) in friends" :key="index">
        <b-card no-body style="padding: 32px">
          <b-row no-gutters align-v="center">
            <b-col md="6" class="text-center" align-self="center">
              <b-img :src="'http://127.0.0.1:3000/' + item.user_image"></b-img>
              <b-card-text class="name"> @{{ item.user_name }} </b-card-text>
              <b-card-text class="email">
                {{ item.user_email }}
              </b-card-text>
              <b-card-text class="phone">
                {{ item.user_phone }}
              </b-card-text>
            </b-col>
            <b-col md="6">
              <b-card-body>
                <b-button size="sm" @click="showModalLocation(item)">Show @{{item.user_name}} Location</b-button>
                <br/> <br />
                <b-button @click="creatingRoom(index)">Message to {{ item.user_name }}
                </b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-modal id="open-location" title="Location" hide-footer centered>
        <GmapMap :center="coordinate" :zoom="15">
          <GmapMarker
            :position="coordinate"
          />
        </GmapMap>
      </b-modal>
    </b-row>
  </div>
</template>

<style scoped>
.contact {
  overflow: auto;
  padding: 2rem;
  height: 100vh;
  background-color: #f6f6f6;
}

.col-md-12 {
  margin: 10px;
}

.card {
  border-radius: 30px;
  border: transparent;
  box-shadow: 0px 20px 20px rgba(223, 222, 222, 0.288);
  margin: 10px;
}

.col-md-6 img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 15px;
}

.name {
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.165px;
  color: #232323;
}

.email,
.phone {
  font-size: 16px;
  line-height: 19px;
  color: #848484;
}

.location {
  font-size: 16px;
  line-height: 19px;
  color: #232323;
}

.vue-map-container {
  width: 250px;
  height: 180px;
  margin: auto;
}

.btn-secondary {
  background-color: #7e98df;
  border-radius: 30px;
  border: transparent;
  font-weight: 500;
  font-size: 14px;
  padding: 0.6em;
}

@media screen and (max-width: 425px) {
  .card {
    padding: 14px !important;
  }

  .card .col-md-6 {
    text-align: center;
  }
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Contact',
  data() {
    return {
      coordinate: { lat: 0, lng: 0 }
    }
  },
  methods: {
    ...mapActions(['getListFriend', 'createRoom']),
    creatingRoom(index) {
      const setData = {
        sender_id: this.userId,
        receiver_id: this.friends[index].friends_id
      }
      this.createRoom(setData)
        .then((response) => {
          this.$router.push('/')
        })
        .catch(() => {
          this.$router.push('/')
        })
    },
    showModalLocation(data) {
      console.log(data)
      this.coordinate = {
        lat: data.user_lat,
        lng: data.user_lng
      }
      this.$bvModal.show('open-location')
    }
  },
  created() {
    this.getListFriend(this.userId)
  },
  computed: {
    ...mapGetters({ friends: 'getListFriends', userId: 'getUserId' })
  }
}
</script>
