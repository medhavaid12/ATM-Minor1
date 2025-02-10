export const sendOTP = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/account/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const verifyOTP = async (otp) => {
  try {
    const response = await fetch('http://localhost:5000/api/account/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ otp })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAccount = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/account', {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deposit = async (amount) => {
  try {
    const response = await fetch('http://localhost:5000/api/account/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ amount })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const withdraw = async (amount) => {
  try {
    const response = await fetch('http://localhost:5000/api/account/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ amount })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const transfer = async (toAccount, amount) => {
  try {
    const response = await fetch('http://localhost:5000/api/account/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ amount, toAccount })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}