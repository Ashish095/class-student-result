import React from 'react';
import './App.css';
import { students } from './student';

class App extends React.Component {
  state = {
    selectedClass: '',
    classResult: []
  };

  studentPassOrNot = (mark) => {
    if (33 < ((mark / 50) * 100)) {
      return 'Pass';
    } else {
      return 'Fail';
    }
  }

  getTotalMarksOfStudent = (student) => {
    for (let i = 0; i <= student.marks.length; i++) {
      let totalStudentMarks = 0;
      student.marks.map((detail) => {
        const passOrNot = this.studentPassOrNot(detail.marks);
        if (passOrNot === "Pass") {
          totalStudentMarks += detail.marks;
        }
        return null;
      });
      return totalStudentMarks;
    }
  }

  sortByTotalMarks = (studentMarks) => {
    return studentMarks.sort((a, b) => {
      return b.studentTotalMarks - a.studentTotalMarks;
    });
  }

  studentArray = (subjectMarks) => {
    let studentMarksDetail = [];
    subjectMarks.map((detail) => {
      studentMarksDetail.push(detail);
    });
    return studentMarksDetail;
  }

  getResultOfClass = (selectedClass) => {
    let classResult = [];
    const selectedClassResult = students.map((student, i) => {
      if (student.class === selectedClass) {
        const studentTotalMarks = this.getTotalMarksOfStudent(student);
        const marksArray = this.studentArray(student.marks);
        const studentName = student.name;
        const studentDetails = { studentTotalMarks, marksArray, studentName };
        return studentDetails;
      }
    });
    selectedClassResult.map((result) => {
      if (result !== undefined) {
        classResult.push(result);
      }
    });
    const sortArray = this.sortByTotalMarks(classResult);
    this.setState({ classResult: sortArray });
  }

  onChangeRadioValue = (e) => {
    this.setState({
      classResult: [],
      selectedClass: e.target.value
    });
  }

  render() {
    const { selectedClass, classResult } = this.state;
    let studentArray = [];
    // students list import from ./student
    const studentMarks = students.map((student) => {
      const studentTotalMarks = this.getTotalMarksOfStudent(student);
      studentArray.push(studentTotalMarks);
      return { studentTotalMarks, student };
    });
    const sortByTotalMarks = this.sortByTotalMarks(studentMarks);
    // to get top 3 students
    const topBestThreeStudents = sortByTotalMarks.slice(0, 3);

    return (
      <>
        <div>
          <h2>Top Three Students</h2>
          {topBestThreeStudents.map((s, i) => {
            return (
              <h4 key={i}>
                {s.student.name.first} {s.student.name.last} obtained&nbsp;
                {s.studentTotalMarks} with {i + 1} Position
              </h4>
            )
          })}
        </div>
        <br />
        <hr />
        <br />
        <div>
          <h2>To Get Result of Class, select one class from below and press search button</h2>
          <div onChange={this.onChangeRadioValue}>
            <input type="radio" id="tenth-A" name="class" value="tenth-a" />
            <label htmlFor="tenth-A">Tenth-A</label><br />
            <input type="radio" id="tenth-B" name="class" value="tenth-b" />
            <label htmlFor="tenth-B">Tenth-B</label><br />
            <input type="radio" id="tenth-C" name="class" value="tenth-c" />
            <label htmlFor="tenth-C">Tenth-C</label>
          </div>
          <br />
          <button onClick={() => this.getResultOfClass(selectedClass)}>Search</button>
          <br />
          <br />
          {classResult.map((result, i) => {
            return (
              <div key={i}>
                {result.studentName.first} {result.studentName.last} obtained {result.studentTotalMarks} marks
                {result.marksArray.map((subjectArray, index) => {
                  return (
                    <p key={index}>
                      {subjectArray.subject} {subjectArray.marks}&nbsp;
                      {this.studentPassOrNot(subjectArray.marks) === 'Pass' ? 'Pass' : 'Fail'}
                    </p>
                  );
                })}
                <h3>got {i + 1} Position</h3>
                <hr />
                <hr />
              </div>
            );
          })}
        </div>
      </>
    );
  }

}

export default App;
