
import Swal from 'sweetalert2'


export const swalService = {
  onSaveSwal,
  onDeleteSwal,

  // USER SWALS
  onUserUpdateSwal,
  onLoginSwal,
  FailLoginSwal,
  onSignupSwal,
  FailedSignupSwal,
  onLogoutSwal,
  logoutFailedSwal,

}


function onSaveSwal() {
  const Toast = Swal.mixin({
    toast: true,
    width: 300,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  })
  Toast.fire({
    icon: 'success',
    title: 'Toy has been saved!'
  })
}


async function onDeleteSwal() {
  await Swal.fire({
    title: 'Delete this toy ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#808080ab',
    confirmButtonText: 'Yes, delete it!'
  })
    .then((result) => {

      if (result.isConfirmed) {

        Swal.fire(
          'Deleted!',
          'Toy successfully deleted.',
          'success'
        )
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    })

}


function onUserUpdateSwal() {
  const Toast = Swal.mixin({
    toast: true,
    width: 250,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  })
  Toast.fire({
    icon: 'success',
    title: 'User updated'
  })
}





// _____________________________USER SWAL_________________________________________________________

// LOGIN
function onLoginSwal(userName) {

  Swal.fire({
    position: 'canter',
    icon: 'success',
    title: `Logged in!`,
    text: `Welcome back ${userName}`,
    showConfirmButton: false,
    timer: 2000
  })
}


function FailLoginSwal() {

  Swal.fire({
    position: 'canter',
    icon: 'error',
    title: `Login Failed!`,
    text: `Invalid username/password`,
    showConfirmButton: false,
    timer: 2000
  })
}

// SIGNUP
function onSignupSwal(userName) {

  Swal.fire({
    position: 'canter',
    icon: 'success',
    title: `Signed up Successfully!`,
    text: `Welcome ${userName}`,
    showConfirmButton: false,
    timer: 2000
  })
}

function FailedSignupSwal(username) {

  Swal.fire({
    position: 'canter',
    icon: 'error',
    title: `Signup Failed!`,
    text: `${username} is already in use, please choose a different username`,
    showConfirmButton: false,
    timer: 3500
  })
}


// LOGOUT
async function onLogoutSwal() {
  await Swal.fire({
    title: 'Logout',
    text: "Are you sure you want to logout ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  })
    .then((result) => {

      if (result.isConfirmed) {

        Swal.fire(
          'Logged out!',
          'Hope to see you again soon!',
          'success'
        )
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    })

}


function logoutFailedSwal() {
  const Toast = Swal.mixin({
    toast: true,
    width: 250,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  })
  Toast.fire({
    icon: 'error',
    title: `an Error occured please try again`
  })
}