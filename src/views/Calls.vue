<template>
  <div class="about">
    <h1>Ultimos llamados</h1>

      <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                          <thead>
                          <tr>
                              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  Box
                              </th>
                              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  Id Paciente
                              </th>
                              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  Doctor
                              </th>
                          </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="call in calls" v-bind:key="'box_' + call.Box">
                              <td class="px-6 py-4 whitespace-no-wrap">
                                  <div class="flex items-center">
                                      <div class="ml-4">
                                          <div class="text-sm leading-5 font-medium text-gray-900">
                                              {{ call.Box }}
                                          </div>
                                      </div>
                                  </div>
                              </td>
                              <td class="px-6 py-4 whitespace-no-wrap">
                                  <div class="text-sm leading-5 text-gray-900">{{ call.CodigoPaciente }}</div>
                              </td>
                              <td class="px-6 py-4 whitespace-no-wrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {{ call.Profesional }}
                                    </span>
                              </td>
                          </tr>

                          <!-- More rows... -->
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
    import Pusher from "pusher-js";

    export default {
        name: "Calls",
        created() {
            this.subscribe()
        },
        data() {
            return {
                calls: [],
            }
        },
        methods: {
            subscribe(){
                let vm = this;
                let pusher = new Pusher('4e299daf37f50f75a79a', { cluster: 'mt1' })
                let channel = pusher.subscribe('my-channel');
                channel.bind('my-event', function(data) {
                    if(vm.calls.length > 2){
                        vm.calls.shift();
                    }
                    vm.calls.push(data);
                    console.log(data);
                });
            }
        },
    }
</script>
