const { Formation, Inscription, Paiement, Users } = require("../models.js/models");

// Add the following function to your existing exports
exports.getStudentEnrollmentsWithPayments = async(req, res)=>{
  const studentId = req.params.id;
  console.log(studentId);
    try {
      const student = await Users.findByPk(studentId, {
        include: [
          {
            model: Inscription,
            include: [
              {
                model: Formation,
              },
              
            ],
          },
        ],
      });
  
      if (!student) {
        throw new Error('Student not found');
      }
  
      // Extract relevant information
      const enrollments = student.Inscriptions.map(inscription => ({
        formation: inscription.Formation,
        
      }));
      
      res.status(200).json(enrollments);

    } catch (error) {
      console.error('Error retrieving student enrollments with payments:', error);
      return null; // Return null in case of an error
    }
  }

 