import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="add-picture"
      title="Новое место"
      submit="Сохранить"
      children={
        <>
          <label className="error-label">
            <input
              type="text"
              className="info info_place-name"
              id="place-name"
              name="name"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="error" id="place-name-error"></span>
          </label>
          <label className="error-label">
            <input
              type="url"
              className="info info_place-link"
              id="place-link"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="error" id="place-link-error"></span>
          </label>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default AddPlacePopup;
