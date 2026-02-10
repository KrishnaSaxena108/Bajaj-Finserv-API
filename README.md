# REST API

A versatile REST API providing mathematical computations and AI-powered responses.

## Features

- **Fibonacci Sequence**: Generate Fibonacci numbers
- **Prime Number Filter**: Filter prime numbers from an array
- **LCM Calculation**: Calculate Least Common Multiple
- **HCF/GCD Calculation**: Calculate Highest Common Factor
- **AI Integration**: Get AI-powered responses using Google Gemini

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
OFFICIAL_EMAIL=your_email@example.com
```

## Usage

### Start the server

```bash
npm start
```

### Development mode (with auto-reload)

```bash
npm run dev
```

## API Endpoints

### Health Check

**GET** `/health`

Returns the API status and official email.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@example.com"
}
```

### Main Endpoint

**POST** `/bfhl`

Accepts a single key-value pair in the request body and returns the corresponding result.

#### Available Operations

##### 1. Fibonacci Sequence

Generate the first N Fibonacci numbers.

**Request:**
```json
{
  "fibonacci": 5
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@example.com",
  "data": [0, 1, 1, 2, 3]
}
```

##### 2. Prime Number Filter

Filter prime numbers from an array.

**Request:**
```json
{
  "prime": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@example.com",
  "data": [2, 3, 5, 7]
}
```

##### 3. LCM (Least Common Multiple)

Calculate the LCM of an array of positive integers.

**Request:**
```json
{
  "lcm": [4, 6, 8]
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@example.com",
  "data": 24
}
```

##### 4. HCF/GCD (Highest Common Factor/Greatest Common Divisor)

Calculate the HCF of an array of positive integers.

**Request:**
```json
{
  "hcf": [12, 18, 24]
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@example.com",
  "data": 6
}
```

##### 5. AI Response

Get an AI-powered single-word response to a question.

**Request:**
```json
{
  "AI": "What is the capital of France?"
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@example.com",
  "data": "Paris"
}
```

## Error Handling

The API returns appropriate error responses:

- **400 Bad Request**: Invalid input or multiple keys in request
- **500 Internal Server Error**: Server or AI service issues

**Error Response Example:**
```json
{
  "is_success": false,
  "error": "Error description"
}
```

## Dependencies

- **express**: Web framework
- **cors**: Cross-Origin Resource Sharing
- **helmet**: Security middleware
- **dotenv**: Environment variable management
- **axios**: HTTP client for AI API calls
- **nodemon**: Development auto-reload (dev dependency)

## Security

The API implements:
- Helmet.js for security headers
- CORS for cross-origin requests
- Request size limiting (1MB)
- Environment variable protection

## Author

Krishna Saxena
