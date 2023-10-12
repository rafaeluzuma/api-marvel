<script lang="ts">
    import { defineComponent, PropType } from 'vue';

    type Items = {
        name: string;
        link: string;
    }
    
    export default defineComponent({
        name: 'Breadcrumb',
        props: {
            items: {
                type: Array as PropType<Items[]>,
                default: () => []
            }
        },
        data() {
            return {};
        },
        methods: {},
    });
</script>

<template>
    <nav class="breadcrumb-container" aria-label="breadcrumb">
        <ol class="breadcrumb pt-lg-5 pt-4">
            <li v-for="(item, index) in items" :key="index">
                <font-awesome-icon v-if="index === 0" icon="house" class="icon"/>
                <span v-else>/</span>
                <router-link :to="item.link" class="text-breadcrumb text-decoration-none px-2">{{ item.name }}</router-link>
            </li>
        </ol>
    </nav>
</template>

<style scoped>
    .text-breadcrumb {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0px;
        text-align: left;
        color: #767676;
    }

    .breadcrumb-container {
        padding-top: 60px;
    }

    .icon {
        color: #767676;
    }
</style>