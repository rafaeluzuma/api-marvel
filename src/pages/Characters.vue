<script lang="ts">
    import { getCharacters } from '../services/server'
    import Breadcrumb from '../components/Breadcrumb.vue';

    type Characters = {
        name: string;
        id: Number;
        thumbnail: {
            path: string;
            extension: string
        }
    }

    export default {
        components: {
            Breadcrumb
        },
        name: 'Characters',
        data() {
            return {
                charactersData: [] as Characters[],
                loading: false
            };
        },
        methods: {
            charactec(charactecId: any){
                this.$router.push({ name: 'charactersDetails', params: { charactecId: charactecId } });
            }
        },
        async mounted(){
            this.loading = true
            const characters = await getCharacters()

            this.charactersData = Array.isArray(characters) ? characters : [];
            this.loading = false              
        },
        computed: {
            characters(): Characters[] {
                return Array.isArray(this.charactersData) ? this.charactersData : [];
            },

            breadcrumbs() {
                return [
                    { name: 'Personagens', link: '/characters' },
                ];
            }
        }
    };
</script>

<template>
    <div class="container-xxl h-100">
        <div v-if="!loading">
            <Breadcrumb :items="breadcrumbs" />

            <div class="py-1 py-lg-3">
                <div class="d-flex flex-wrap justify-content-between justify-content-md-start gap-1 gap-md-4 mx-auto">
                    <div class="d-flex flex-column" v-for="(character, index) in characters" :key="index">
                        <img class="size-image" :src="`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`" alt="" width="165" height="183" />
                        <a 
                            class="text-center truncate-text pt-3 text-uppercase text-decoration-underline text-black fw-bold" 
                            data-bs-toggle="collapse" 
                            href="#multiCollapseExample1" 
                            role="button" 
                            aria-expanded="false" 
                            aria-controls="multiCollapseExample1"
                            @click="charactec(character.id)"
                        >
                            {{ character.name }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="d-flex flex-fill flex-column align-items-center justify-content-center h-100">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">...</span>
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

    @media (min-width: 576px) {
        .text-home {
           font-size: 32px; 
        }

        .size-image {
            width: 195px;
            height: 183px;
        }
    }

    @media (min-width: 414px) and (max-width: 575px) {
        .size-image {
            width: 185px;
            height: 183px;
        }
    }
</style>