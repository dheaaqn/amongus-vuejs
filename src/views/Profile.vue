<template>
  <div class="login">
    <b-row align-h="center" align-v="center">
      <b-col>
        <b-card border-variant="white" class="text-center">
          <b-alert
            show
            v-if="isSuccess"
            variant="success"
            dismissible
            @dismissed="closeAlert"
            >{{ this.resMsg }}!</b-alert
          >
          <b-col class="text-left">
            <b-button @click="openModal">Edit Profile</b-button>
            <b-modal id="modal-edit" centered hide-header hide-footer>
              <div class="edit-container" style="margin: 2rem">
                <h3>Edit Profile</h3>
                <b-form @submit.prevent="onSubmit">
                  <b-form-group id="input-group-1">
                    <label for="input-1">Username</label>
                    <b-form-input
                      id="input-1"
                      type="text"
                      size="sm"
                      required
                      v-model="form.user_name"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-2">
                    <label for="input-2">Phone Number</label>
                    <b-form-input
                      id="input-2"
                      type="text"
                      size="sm"
                      required
                      v-model="form.user_phone"
                    ></b-form-input>
                  </b-form-group>
                  <b-button type="submit" block>Submit</b-button>
                </b-form>
              </div>
            </b-modal>
          </b-col>
          <b-card-body>
            <b-img :src="url + '/' + profile.user_image"></b-img>
            <div class="edit">
              <div class="edit-icon">
                <input
                  type="file"
                  ref="file"
                  @change="upFile"
                  style="display: none"
                />
                <p @click="$refs.file.click()" style="cursor: pointer">
                  Edit <b-icon icon="pencil-fill"></b-icon>
                </p>
              </div>
              <p style="margin: 0 1rem 1rem">|</p>
              <div class="delete-icon">
                <p @click="deleteImage" style="cursor: pointer">
                  Delete <b-icon icon="trash-fill"></b-icon>
                </p>
              </div>
            </div>
            <b-card-text class="name"> @{{ profile.user_name }} </b-card-text>
            <b-card-text class="email">
              {{ profile.user_email }}
            </b-card-text>
            <b-card-text class="phone">
              {{ profile.user_phone }}
            </b-card-text>
            <b-card-text class="location"> Location </b-card-text>
            <b-button size="sm" v-b-modal.open-location
              >show my location</b-button
            >
            <b-modal
              id="open-location"
              title="My Location"
              hide-footer
              centered
            >
              <GmapMap :center="coordinate" :zoom="10">
                <GmapMarker
                  :position="coordinate"
                  :clickable="true"
                  :draggable="true"
                  @click="clickMarker"
                />
              </GmapMap>
            </b-modal>
          </b-card-body>
          <b-col class="text-right">
            <b-button @click="logout">Logout</b-button>
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
  .login {
    overflow: hidden;
  }

  .row {
    background: #f6f6f6;
    height: 100vh;
  }

  .col {
    max-width: 60rem;
  }

  .card {
    border-radius: 30px;
    box-shadow: 0px 20px 20px rgba(223, 222, 222, 0.288);
  }

  .card-body img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 30px;
  }

  .name {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: -0.165px;
    color: #232323;
  }

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
    width: 300px;
    height: 180px;
    margin: auto;
  }

  .btn-secondary {
    background-color: #7e98df;
    border-radius: 30px;
    border: transparent;
    font-weight: 500;
    font-size: 14px;
    padding: 0.8em;
  }

  .form-control {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #232323;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: transparent;
  }

  .form-group label {
    font-size: 14px;
    color: #848484;
    opacity: 0.75;
  }

  .edit {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 320px) {
    div.vue-map-container {
      width: 260px;
      height: 180px;
    }
  }
</style>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Profile',
    data() {
      return {
        coordinate: { lat: 0, lng: 0 },
        url: process.env.VUE_APP_URL,
        isSuccess: false,
        resMsg: '',
        form: {
          user_name: '',
          user_phone: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'getUserProfile',
        'logout',
        'patchUserProfile',
        'patchLocation',
        'patchProfilePict',
        'deleteProfilePict'
      ]),
      clickMarker(position) {
        this.coordinate = {
          lat: position.latLng.lat(),
          lng: position.latLng.lng()
        }
      },
      closeAlert() {
        this.isSuccess = false
      },
      openModal() {
        this.$bvModal.show('modal-edit')
        this.form = {
          user_name: this.profile.user_name,
          user_phone: this.profile.user_phone
        }
      },
      upFile(event) {
        this.profile.user_image = event.target.files[0]
        const data = new FormData()
        data.append('user_image', this.profile.user_image)
        const payload = {
          user_id: this.userId,
          user_data: data
        }
        this.patchProfilePict(payload)
          .then((result) => {
            this.profile.user_image = result.user_image
            this.makeToast('Profile picture updated', 'Success', 'success')
          })
          .catch((error) => {
            this.profile.user_image = 'unamed.png'
            this.makeToast(error, 'Error', 'danger')
          })
      },
      onSubmit() {
        const setData = {
          user_id: this.userId,
          form: this.form
        }

        this.patchUserProfile(setData)
          .then((result) => {
            this.makeToast('Profile updated', 'Success', 'success')
            this.$bvModal.hide('modal-edit')
            this.getUserProfile(this.userId)
          })
          .catch((error) => {
            this.makeToast(error.data.msg, 'Error', 'danger')
          })
      },
      deleteImage() {
        const payload = {
          user_id: this.userId
        }
        this.deleteProfilePict(payload)
          .then((result) => {
            this.makeToast('Profile updated', 'Success', 'success')
            this.getUserProfile(this.userId)
          })
          .catch((error) => {
            this.makeToast(error, 'Error Failed', 'danger')
          })
      },
      makeToast(msg, title, variant) {
        this.$bvToast.toast(msg, {
          title: title,
          variant: variant,
          solid: true
        })
      }
    },
    created() {
      this.getUserProfile(this.userId)
      this.$getLocation()
        .then((coordinates) => {
          this.coordinate = {
            lat: coordinates.lat,
            lng: coordinates.lng
          }

          const setData = {
            user_id: this.userId,
            user_data: this.coordinate
          }

          this.patchLocation(setData)
        })
        .catch((error) => {
          return error
        })
    },
    computed: {
      ...mapGetters({ profile: 'getProfile', userId: 'getUserId' })
    }
  }
</script>
