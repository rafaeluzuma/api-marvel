<script lang="ts">
    import { getEvents } from '../services/server';
    import Breadcrumb from '../components/Breadcrumb.vue';

    type Events = {
        title: string;
        id: Number;
        description: string;
        modified: string;
        thumbnail: {
            path: string;
            extension: string
        }
    }

    export default {
        name: 'Events',
        components: {
            Breadcrumb
        },
        data() {
            return {
                eventsData: [] as Events[],
                loading: false
            };
        },
        methods: {},
        async mounted(){
            this.loading = true
            const events = await getEvents()

            this.eventsData = Array.isArray(events) ? events : [];
            this.loading = false
        },
        computed: {
            events(): Events[] {
                return Array.isArray(this.eventsData) ? this.eventsData : [];
            },

            breadcrumbs() {
                return [
                    { name: 'Eventos', link: '/events' },
                ];
            }
        }
    };
</script>

<template>
    <div class="container-xxl h-100 px-3 px-lg-2">
        <div v-if="!loading">
            <Breadcrumb :items="breadcrumbs" />

            <div class="py-0">
                <div class="d-flex flex-wrap gap-1">
                    <div class="row">
                        <div class="d-flex flex-column gap-2 flex-lg-row col-md-6 px-lg-3 py-lg-0 px-2 my-3" v-for="(event, index) in events" :key="index">
                            <img class="d-flex size-image w-auto" :src="`${event?.thumbnail?.path}.${event?.thumbnail?.extension}`" alt="" height="300">
                            <div class="d-flex flex-column px-lg-3 py-3 py-lg-0">
                                <h3 class="text-start">{{ event.title }}</h3>
                                <p class="text-justify text-lg-start text-uppercase truncate-text">{{ event.description }}</p>
                                <span>
                                    <strong class="text-uppercase">Data do evento:</strong> {{ new Date(event.modified).toLocaleDateString() }}
                                </span>
                            </div>
                        </div>
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
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    @media (min-width: 576px) {
        .size-image {
            width: 223px;
            height: 223px;
        }
    }
</style>