<script setup>
    import { onMounted, reactive } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { FormKit } from "@formkit/vue";
  import ClienteService from "../services/ClienteService";
  import RouterLink from '../components/UI/RouterLink.vue';
  import Heading from '../components/UI/Heading.vue';
  const route = useRoute();
  const router = useRouter();
  const formData = reactive({});
  defineProps({
    titulo: {
      type: String
    }
  })
  const { id } = route.params;
  onMounted(() => {
    ClienteService.obtenerCliente(id)
    .then(({data}) => {
        Object.assign(formData, data);
    })
    .catch(error => console.log(error))
  })
  const enviarDatos = (data) => {
    data.estado = formData.estado;
    ClienteService.actualizarCliente(id, data)
    .then(respuesta => {
        router.push({ name: 'inicio'})
    })
    .catch(error => console.log(error))
  }
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="inicio">Volver</RouterLink>
      </div>
    <Heading>{{titulo}}</Heading>

    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Editar Cliente"
          incomplete-message="No se pudo enviar, revisa los mensajes"
          @submit="enviarDatos"
          :value="formData"
        >
          <FormKit 
            type="text"
            label="Nombre"
            name="nombre"
            placeholder="Nombre del cliente"
            validation="required"
            :validation-messages="{ required : 'El Nombre del Cliente es Obligatorio'}"
            validation-visibility="blur"
            v-model="formData.nombre"
            />
          <FormKit 
            type="text"
            label="Apellido"
            name="apellido"
            placeholder="Apellido del cliente"
            validation="required"
            :validation-messages="{ required : 'El Apellido del Cliente es Obligatorio'}"
            validation-visibility="blur"
            v-model="formData.apellido"
            />
          <FormKit 
            type="email"
            label="Email"
            name="email"
            placeholder="Email del cliente"
            validation="required|email"
            :validation-messages="{ required : 'El Email del Cliente es Obligatorio', email: 'Coloca un email valido'}"
            validation-visibility="blur"
            v-model="formData.email"
            />
          <FormKit 
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="Teléfono xxx-xxx-xxxx"
            validation="?matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}/"
            :validation-messages="{ matches : 'El Teléfono no tiene formato valido'}"
            validation-visibility="blur"
            v-model="formData.telefono"
            />
          <FormKit 
            type="text"
            label="Empresa"
            name="empresa"
            placeholder="Empresa del cliente"
            v-model="formData.empresa"
            />
          <FormKit 
            type="text"
            label="Puesto"
            name="puesto"
            placeholder="Puesto del cliente"
            v-model="formData.puesto"
            />
        </FormKit>
      </div>
    </div>
  </div>
</template>
<style scoped>
.formkit-wrapper{
  max-width: 100%;
}
</style>