post http://localhost:5001/api/v1/admin/customer/worker/change-status
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUyNDk1ODA3fQ.aWzmUVMQuQC5DCd575wXK_7kW6pgyVb0nos-H_bd9L8

# -- change status worker
# {
#   "customerId": 2,
# 	"workerId": "testing",
# 	"isActive": false
# }

# -- delete worker
# {
#   "customerId": 2,
# 	"workerId": "testing"
# }

# -- create worker
# {
#   "isActive": true,
#   "customerId": 2,
# 	"workerId": "testing",
# 	"email": "testing@gmail.com"
# }

# -- change status customer
# {
#   "isActive": true,
#   "customerId": 2
# }

# -- create customer
# {
#   "company" : {
#     "name": "Rato AB",
#     "organizationNumber": "552211-0236",
#     "city": "Täby",
#     "address": "Gatuvägen 5",
#     "postalCode": 18333
#   },
# 	  "projectManagers": [
# 	    {
# 	      "workerId": "Rato.Muhammad",
# 	      "email": "muhammad@rato.se",
# 	      "isActive": true
# 	    },
# 	    {
# 	      "workerId": "Rato.Muhammad",
# 	      "email": "muhammad@rato.se",
# 	      "isActive": true
# 	    }
# 	],
#   "workers": [
#     {
#       "workerId": "Rato.Muhammad",
#       "email": "muhammad@rato.se",
#       "isActive": true
#     },
#     {
#       "workerId": "Rato.Muhammad",
#       "email": "muhammad@rato.se",
#       "isActive": true
#     }
# 	]
# }

# --register
# {
#   "name": "nuril",
#   "email": "nuril@gmail.com",
#   "password": "987654321"
# }

# --login
# {
#   "email": "nuril@gmail.com",
#   "password": "123456789"
# }

# --change-password
# {
# 	"email": "nuril@gmail.com",
# 	"oldPassword": "987654321",
# 	"newPassword": "123456789",
# 	"retryNewPassword": "123456789"
# }