<script lang="ts">
    import { getCharacterDetails, getComics } from '../services/server';
    import Breadcrumb from '../components/Breadcrumb.vue';

    type Details = {
        id: Number;
        name: string;
        modified: string;
        description: string;
        thumbnail: {
            path: string;
            extension: string
        };
    }

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
        name: 'CharecterDetails',
        components: {
            Breadcrumb
        },
        props: {
            charactecId: {
                type: Number,
                required: false
            }
        },
        data() {
            return {
                charactec: {} as Details,
                comicsData: [] as Comics[],
                loading: false
            };
        },
        methods: {},
        async mounted(){
            this.loading = true
            if (!this.charactecId) {
                return
            }

            const details  = await getCharacterDetails(this.charactecId);

            if (!details) {
                return
            }
            
            this.charactec = details[0]

            const characters  = await getComics();

            if (!characters) {
                return
            }

            this.comicsData = characters
            this.loading = false
        },
        computed: {
            breadcrumbs() {
                return [
                    { name: 'Personagens', link: '/characters' },
                    { name: `${this.charactec.name}`, link: `/characters/${this.charactec.id}` }
                ];
            },

            Comics(): Comics[] {
                return Array.isArray(this.comicsData) ? this.comicsData : [];
            },
        }
    };
</script>

<template>
    <div v-if="!loading">
        <div class="container-xxl px-3 px-lg-2 py-2 py-lg-0">
            <Breadcrumb :items="breadcrumbs" />

            <div class="d-flex flex-column flex-lg-row py-0 gap-lg-5 gap-3 py-1 py-lg-3">
                <img class="mxw-300" :src="`${charactec?.thumbnail?.path}.${charactec?.thumbnail?.extension}`" alt="">
                <div class="d-flex flex-column">
                    <h3>{{ charactec?.name}}</h3>
                    <p>{{ charactec?.description }}</p>
                </div>
            </div>

            <h3 class="py-3">Quadrinhos</h3>
        
            <div class="pb-3">
                <div class="d-flex flex-wrap gap-3 gap-lg-4 justify-content-between">
                    <div v-for="(comic, index) in Comics" :key="index">
                        <img class="size-image" :src="`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`" alt="" width="162" height="245">
                        <p class="text-center truncate-text">{{ comic.title }}</p>
                        <span>Paginas: {{ comic.pageCount }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex flex-fill flex-column align-items-center justify-content-center h-100">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">...</span>
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

    @media (min-width: 576px) {
        .mxw-300{
            max-width: 300px;
        }

        .size-image-comics {
            width: 200px;
            height: 318px;
        }
    }

    @media (min-width: 414px) and (max-width: 575px) {
        .size-image {
            width: 180px;
            height: 183px;
        }
    }
</style>