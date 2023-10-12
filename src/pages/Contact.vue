<script lang="ts">
    import { defineComponent } from 'vue';
    import Breadcrumb from '../components/Breadcrumb.vue';
    import { mask } from 'vue-the-mask'
    import Modal from '../components/Modal.vue'
    import * as bootstrap from 'bootstrap';


    export default defineComponent({
        name: 'Contact',
        directives: { mask } as {},
        components: {
            Breadcrumb,
            Modal
        },
        data() {
            return {
                form: {
                    phone: '',
                    email: '',
                    name: '',
                    message: ''
                },
                errorPhone: '',
                errorEmail: '',
            };
        },
        methods: {
            handleForm(): void {
                var modalElement = document.getElementById('exampleModal');
                var modalInstance = new bootstrap.Modal(modalElement || '');
                modalInstance.show();

                this.form.phone = ''
                this.form.email = ''
                this.form.name = ''
                this.form.message = ''
            },
        },
        computed: {
            breadcrumbs() {
                return [
                    { name: 'Contato', link: '/contact' },
                ];
            },

            disabledBtn() {
                return (this.form.name.length > 0) && (this.form.message.length > 0) && (this.form.email.length > 0) && (this.form.phone.length > 0)
            }
        },
        watch: {
            'form.phone': function(newD: any) {
                if (newD.length > 0 && newD.length < 16) {
                    this.errorPhone = 'Telefone inválido';
                } else {
                    this.errorPhone = ''
                }
            }
        }
    });
</script>

<template>
    <div class="container-xxl">
        <Breadcrumb :items="breadcrumbs" />

        <Modal title="Message sent successfully!" message="Thank you, we'll reach you as soon as possible"/>

        <div>
            <form @submit.prevent="handleForm">
                <div class="custom-max-width">
                    <div class="py-2">
                        <label class="custom-text-label" for="name">Nome</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            aria-label="Dollar amount (with dot and two decimal places)"
                            placeholder="Ex.: Seu nome completo"
                            v-model="form.name"
                            autocomplete="off"
                            required
                            id="name"
                        />
                    </div>
                    <div class="py-2">
                        <label class="custom-text-label" for="email">Email</label>
                        <input 
                            type="email" 
                            class="form-control" 
                            aria-label="Dollar amount (with dot and two decimal places)"
                            placeholder="Ex.: meuemail@email.com"
                            autocomplete="off"
                            v-model="form.email"
                            required
                            id="email"
                        />
                    </div>
                    <div class="py-2">
                        <label class="custom-text-label" for="phone">Telefone</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            aria-label="Dollar amount (with dot and two decimal places)"
                            placeholder="Ex.: (99) 9 9999-9999"
                            v-mask="'(##) #####0-####'" v-model="form.phone"
                            autocomplete="off"
                            required
                            id="phone"
                        />
                        <span v-if="errorPhone" class="text-danger py-1"> {{ errorPhone }}</span>
                    </div>
                    <div class="py-2">
                        <label class="custom-text-label" for="message">Mensagem</label>
                        
                        <textarea 
                            type="text" 
                            class="form-control" 
                            placeholder=""
                            rows="4"
                            v-model="form.message" 
                            id="message"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" id="btn-send-contact" :class="disabledBtn ? 'btn-danger': 'btn-secondary'" :disabled="!disabledBtn" class="btn custom-btn custom-btn-text">Enviar</button>
                </div>
            </form>
        </div>

    </div>
</template>

<style scoped>
    .custom-max-width {
        max-width: 620px;
    }

    .custom-text-label {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
    }

    .custom-btn {
        border: none;
        border-radius: 4px;
        width: 100%;
    }

    .custom-btn-text {
        color: #767676;
        color: #fff;
    }

    input {
        border-radius: 4px;
    }

    textarea {
        resize: none;
        border-radius: 4px;
    }

    ::placeholder {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0px;
        text-align: left;
        color: #CCCCCC;
    }

    @media (min-width: 576px) {
        .custom-btn {
            width: auto;
        }
    }
</style>