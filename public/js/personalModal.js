function openModal(modalButton,modal,closeModal) {
    
    modalButton.addEventListener("click",() => {
        modal.classList.remove("hidden");
    });
    
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    })
};

const updateFullName = document.getElementById("updateFullName");
const updatefullNameModalIcon = document.getElementById("updatefullNameModalIcon");
const closeModalButton = document.getElementById("closeModalButton");
const updatePhoneModal = document.getElementById("updatePhoneModal");
const updatePhone = document.getElementById("updatePhone");
const closeModalButtonPhone = document.getElementById("closeModalButtonPhone");

const imagePersonal = document.getElementById("imagePersonal");
const personalImageModal = document.getElementById("personalImageModal");
const closeModalButtonImage = document.getElementById("closeModalButtonImage");

openModal(imagePersonal,personalImageModal,closeModalButtonImage);
openModal(updatefullNameModalIcon,updateFullName,closeModalButton);
openModal(updatePhone,updatePhoneModal,closeModalButtonPhone);