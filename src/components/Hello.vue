<template>
    <div>{{text}}</div>
</template>

<script setup>
    const props = defineProps({text:{
        type: String,
        required: true,
        default: 'Hello'
    }})
</script>

<style>
    div{
        color: white;
    }
</style>