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

            onInputBlurPhone(): void | undefined {
                if (this.form.phone.length > 0 && this.form.phone.length < 16) {
                    this.errorPhone = 'Telefone inválido';
                    return
                    
                }

                this.errorPhone = '';
            },

            onInputBlurEmail() {
                const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (this.form.email.length > 0 && !pattern.test(this.form.email)) {
                    this.errorEmail = 'E-mail inválido'
                    return
                }

                this.errorEmail = ''
            }
            
        },
        computed: {
            breadcrumbs() {
                return [
                    { name: 'Contato', link: '/contact' },
                ];
            },

            disabledBtn() {
                return (this.form.name.length > 0) && 
                    (this.form.message.length > 0) && 
                    (this.form.email.length > 0) && 
                    (this.form.phone.length > 0) && 
                    (this.errorPhone == '') && 
                    (this.errorEmail == '')
            }
        }
    });
</script>

<template>
    <div class="container-xxl px-lg-2">
        <Breadcrumb :items="breadcrumbs" />

        <Modal 
            title="Message sent successfully!" 
            message="Thank you, we'll reach you as soon as possible"
        />

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
                            @blur="onInputBlurEmail" 
                            type="email" 
                            class="form-control" 
                            aria-label="Dollar amount (with dot and two decimal places)"
                            placeholder="Ex.: meuemail@email.com"
                            autocomplete="off"
                            v-model="form.email"
                            required
                            id="email"
                            :class="{ 'border-error': errorEmail }"
                        />
                        <span v-if="errorEmail" class="text-danger py-1"> {{ errorEmail }}</span>
                    </div>
                    <div class="py-2">
                        <label class="custom-text-label" for="phone">Telefone</label>
                        <input
                            @blur="onInputBlurPhone" 
                            type="text" 
                            class="form-control" 
                            aria-label="Dollar amount (with dot and two decimal places)"
                            placeholder="Ex.: (99) 9 9999-9999"
                            v-mask="'(##) #####-####'" v-model="form.phone"
                            autocomplete="off"
                            required
                            id="phone"
                            :class="{ 'border-error': errorPhone }"
                        />
                        <span v-if="errorPhone" class="text-danger py-1"> {{ errorPhone }}</span>
                    </div>
                    <div class="py-2">
                        <label class="custom-text-label" for="message">Mensagem</label>
                        
                        <textarea 
                            type="text" 
                            class="form-control" 
                            placeholder="Mensagem de contato para marvel"
                            rows="4"
                            v-model="form.message" 
                            id="message"
                            required
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        id="btn-send-contact" 
                        :class="disabledBtn ? 'btn-danger': 'btn-secondary'" 
                        :disabled="!disabledBtn" 
                        class="btn custom-btn custom-btn-text p-2"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

<style scoped>
    input:focus {
        outline: none !important;
        box-shadow: none !important;
    }

    textarea:focus {
        outline: none !important;
        box-shadow: none !important;
    }
    .custom-max-width {
        max-width: 620px;
    }

    .border-error {
        border-color: #EC1D24;
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