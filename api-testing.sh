post  http://localhost:5001/api/v1/admin/change-password
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk3NzA1NDc2fQ.fQ8pGKkl6Tn15W-QUxXKhM3CpfD159xcTVS9AM8zNL0

# {
#   "email": "nuril@gmail.com",
#   "password": "987654321"
# }

{
	"email": "nuril@gmail.com",
	"oldPassword": "987654321",
	"newPassword": "123456789",
	"retryNewPassword": "123456789"
}