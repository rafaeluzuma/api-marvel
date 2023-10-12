<script lang="ts">
    import { getComics } from '../services/server'
    import Breadcrumb from '../components/Breadcrumb.vue';

    type Comics = {
        title: string;
        id: Number;
        pageCount: Number;
        thumbnail: {
            path: string;
            extension: string
        }
    }

    export default {
        name: 'Comics',
        components: {
            Breadcrumb
        },
        data() {
            return {
                comicsData: [] as Comics[],
                loading: false
            };
        },
        methods: {},
        async mounted(){
            this.loading = true
            const comics = await getComics()

            this.comicsData = Array.isArray(comics) ? comics : [];
            this.loading = false
        },
        computed: {
            comics(): Comics[] {
                return Array.isArray(this.comicsData) ? this.comicsData : [];
            },

            breadcrumbs() {
                return [
                    { name: 'Quadrinhos', link: '/comics' },
                ];
            }
        }
    };
</script>

<template>
    <div class="container-xxl h-100 py-2 py-lg-0">
        <div v-if="!loading">
            <Breadcrumb :items="breadcrumbs" />

            <div class="pt-2 pb-4 pt-lg-3">
                <div class="d-flex flex-wrap gap-4 justify-content-between justify-content-lg-start">
                    <div class="flex-item" v-for="(comic, index) in comics" :key="index">
                        <img class="size-image" :src="`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`" alt="" width="162" height="245">
                        <p class="text-center truncate-text">{{ comic.title }}</p>
                        <span>Paginas: {{ comic.pageCount }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="d-flex flex-row flex-fill align-items-center justify-content-center h-100">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .truncate-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 160px;
    }

    .flex-item:not(:last-child) {
        justify-content: flex-start;
    }

    @media (min-width: 576px) {
        .size-image {
            width: 195px;
            height: 290px;
        }
    }

    @media (min-width: 414px) and (max-width: 575px) {
        .size-image {
            width: 180px;
        }
    }
</style>