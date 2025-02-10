export const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const register = async (name, email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const setupAccount = async (accountNumber, accountType, balance, bankName) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:5000/api/auth/setup-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({ accountNumber, accountType, balance, bankName })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

