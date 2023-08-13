<script setup>
  import { onMounted, ref, computed } from "vue";
  import ClienteService from "../services/ClienteService";
  import RouterLink from '../components/UI/RouterLink.vue';
  import Heading from '../components/UI/Heading.vue';
  import Cliente from "../components/Cliente.vue";
  const clientes = ref([]);
  const existenClientes = computed(() =>{
    return clientes.value.length > 0
  })
  const table = ['Nombre', 'Empresa', 'Estado', 'Acciones'];
  defineProps({
    titulo: {
      type: String
    }
  })
  onMounted(() => {
    ClienteService.obtenerClientes()
    .then(({data}) => {
      clientes.value = data;
    })
    .catch(error => console.log('hubo un error'))
  })
  const actualizarEstado = (data) =>{
    data.estado = data.estado == 1 ? 0 : 1;
    ClienteService.actualizarEstadoCliente(data.id, data)
    .then(({data}) => {
      console.log('Estado Actualizado');
    })
    .catch(error => {
      console.log('hubo un error');
      data.estado = data.estado == 1 ? 0 : 1;
    })
  }
  const eliminarCliente = (id) =>{
    ClienteService.eliminarCliente(id)
    .then(({data}) => {
      clientes.value = clientes.value.filter(cliente => cliente.id != id);
    })
    .catch(error => {
      console.log('hubo un error');
    })
  }

</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink :to="'nuevo-cliente'">Agregar Cliente</RouterLink>
    </div>
    <Heading>{{titulo}}</Heading>
    
  <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th v-for="tabla in table" :key="tabla" scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">{{ tabla }}</th> 
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <Cliente v-for="cliente in clientes" :key="cliente.id" :cliente="cliente" 
                  @actualizar-estado="actualizarEstado"
                  @eliminar-cliente="eliminarCliente"
                  >

                  </Cliente>
                </tbody>
            </table>
        </div>
    </div>
  </div>
    <p v-else class="text-center mt-10">No hay clientes</p>
  </div>
</template>