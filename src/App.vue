<template>
  <div>

    <form @submit.prevent="estatusEditar ? updateTodo() : addTodo()">
      id
      <p>
        <input type="text" v-model="id">
      </p>
      titulo
      <p>
        <input type="text" v-model="titulo">

        <button type="submit">{{estatusEditar ? "Editar": "Agregar titulo"}}</button>
        <button v-if="estatusEditar" @click="estatusEditar= false,id='', titulo='', autor =''">Cancelar</button>
      
      </p>
      autor
      <p>
        <input type="text" v-model="autor">      
      </p>
    </form>

    <img src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif" v-if="cargando">
    
    Lista de libros

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.id}} - {{todo.titulo}} - {{todo.autor}}
        <button @click="deleteTodo(todo)">Eliminar</button> - 
        <button @click="selectTodo(todo)">Editar</button>

      </li>
    </ul>

  </div>
</template>

<script>

import {db} from './firebase'

export default {
  name: 'App',

  data() {
    return {
      todos: [],
      id: "",
      titulo: "",
      autor: "",
      cargando: false,
      estatusEditar: false 
    }
  },

  created(){
    this.listarTodos();
  },

  methods: { 
    async listarTodos(){

        this.cargando = true;
        const data = await db.collection("todos").get();
        this.todos = data.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))
        this.cargando = false;
        console.log(this.todos);

    },
    async addTodo() {
        await db.collection('todos').add(
          {
            id: this.id,
            titulo: this.titulo,
            autor: this.autor
          }
        )
        this.id = ""
        this.titulo = "";
        this.autor = "";
        this.listarTodos();
    },

    async deleteTodo(todo){
      if(confirm(`Esta seguro de querer eliminar ${todo.id} - ${todo.titulo} - ${todo.autor}`)){
      await db.collection('todos').doc(todo.id).delete();
      this.listarTodos();
      }
    },

    selectTodo(todo){
      this.estatusEditar = true;
      this.id = todo.id;
      this.titulo = todo.titulo;
      this.autor = todo.autor;
    },

    async updateTodo(){
      await db.collection('todos').doc(this.id).set({
        id: this.id,
        titulo: this.titulo,
        autor: this.autor
      })
      this.estatusEditar = false;
      this.id= "";
      this.titulo= "";
      this.autor = "";
      this.listarTodos();
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}
</style>