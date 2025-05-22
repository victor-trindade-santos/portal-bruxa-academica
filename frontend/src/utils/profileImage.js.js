// GAMBIARRA

export const saveProfileImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
        localStorage.setItem('profileImage', reader.result);
        if (callback) callback(reader.result);
    };
    reader.readAsDataURL(file);
};

export const getProfileImage = () => {
    return localStorage.getItem('profileImage') || null;
};
