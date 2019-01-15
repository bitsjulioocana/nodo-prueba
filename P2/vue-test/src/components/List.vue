<template>
  <v-card class="m-16">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :loading="isLoading" :items="characters" :search="search">
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item['name']}}</td>
          <td>{{ props.item['house'] }}</td>
          <td>{{ props.item['pageRank'] }}</td>
          <td class="text-xs-center">
            <v-btn color="info" @click="goToDetail(props.item['_id'], props.item['name'])">Details</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{selected.name}}
        </v-card-title>

        <v-card-text v-if="isLoadingDialog" class="text-xs-center">
          <v-progress-circular :size="70" :width="7" indeterminate></v-progress-circular>
        </v-card-text>

        <v-card-text v-else>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex md6 sm12>
                <b>Name: </b><br>
                <p>{{selected['name']}}</p>
              </v-flex>
              <v-flex md6 sm12>
                <b>House: </b><br>
                <p>{{selected['house']}}</p>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md6 sm12>
                <b>Page Rank: </b><br>
                <p>{{selected['pageRank']}}</p>
              </v-flex>
              <v-flex md6 sm12>
                <b>Gender: </b><br>
                <p>{{selected['male']|gender}}</p>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md6 sm12>
                <b>Titles: </b><br>
                <p>
                  <v-chip v-for="title in selected['titles']">{{title}}</v-chip>
                </p>
              </v-flex>
              <v-flex md6 sm12>
                <b>Books: </b><br>
                <p>
                  <v-chip v-for="book in selected['books']">{{book}}</v-chip>
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>

</template>

<style scoped>
  .m-16 {
    margin: 16px;
  }
</style>

<script>
  import {listsAllCharacters, getACharacter} from '../services/got.service.js'

  export default {
    name: "List",
    data() {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'House',
            align: 'left',
            sortable: false,
            value: 'house'
          },
          {
            text: 'Page Rank',
            align: 'left',
            sortable: false,
            value: 'house'
          },
          {
            text: 'Detail',
            align: 'center',
            sortable: false,
          }
        ],
        characters: [],
        isLoading: false,
        selected: {},
        dialog: false,
        isLoadingDialog: false
      }
    },
    created() {
      this.isLoading = true;
      listsAllCharacters()
        .then(res => {
          this.characters = res;
          this.isLoading = false
        })
    },
    methods: {
      goToDetail(id, name) {
        this.isLoadingDialog = true;
        this.selected['name'] = name;
        this.dialog = true;
        getACharacter(id)
          .then(res => {
            this.selected = res.data;
            this.isLoadingDialog = false
          })
      }
    },
    filters: {
      gender(value) {
        return value ? "Male" : "Female"
      }
    }
  }
</script>

<style scoped>

</style>