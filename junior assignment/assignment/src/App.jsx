// Import necessary React and Bootstrap components
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// Define the main component
const ExpressionEngineUI = () => {
  // State to manage the form inputs and expressions
  const [connectorType, setConnectorType] = useState('and');
  const [expressions, setExpressions] = useState([
    {
      ruleType: 'Age',
      operator: '>=',
      value: '',
      score: ''
    }
  ]);

  // Function to handle changes in connector type
  const handleConnectorTypeChange = (e) => {
    setConnectorType(e.target.value);
  };

  // Function to handle changes in expression fields
  const handleExpressionChange = (index, field, value) => {
    const newExpressions = [...expressions];
    newExpressions[index][field] = value;
    setExpressions(newExpressions);
  };

  // Function to add a new expression
  const addExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>=', value: '', score: '' }]);
  };

  // Function to delete an expression
  const deleteExpression = (index) => {
    const newExpressions = [...expressions];
    newExpressions.splice(index, 1);
    setExpressions(newExpressions);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Create the JSON output based on the entered data
    const output = {
      rules: expressions.map((expression) => ({
        key: expression.ruleType.toLowerCase().replace(/\s/g, '_'),
        output: {
          value: expression.value,
          operator: expression.operator,
          score: expression.score
        }
      })),
      combinator: connectorType.toLowerCase()
    };

    // Log the output (you can send it to a server or perform any other action here)
    console.log(JSON.stringify(output, null, 2));
  };

  // Render the UI
  return (
    <Container>
      <Form>
        <Form.Group controlId="connectorType">
          <Form.Label>Connector Type</Form.Label>
          <Form.Control as="select" value={connectorType} onChange={handleConnectorTypeChange}>
            <option value="and">AND</option>
            <option value="or">OR</option>
          </Form.Control>
        </Form.Group>

        {expressions.map((expression, index) => (
          <Row key={index}>
            <Col>
              <Form.Group controlId={`ruleType${index}`}>
                <Form.Label>Rule Type</Form.Label>
                <Form.Control as="select" value={expression.ruleType} onChange={(e) => handleExpressionChange(index, 'ruleType', e.target.value)}>
                  <option value="Age">Age</option>
                  <option value="Credit Score">Credit Score</option>
                  <option value="Account Balance">Account Balance</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`operator${index}`}>
                <Form.Label>Operator</Form.Label>
                <Form.Control as="select" value={expression.operator} onChange={(e) => handleExpressionChange(index, 'operator', e.target.value)}>
                  <option value=">">{'>'}</option>
                  <option value="<">{'<'}</option>
                  <option value=">=">{'>='}</option>
                  <option value="<=">{'<='}</option>
                  <option value="=">={'='}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`value${index}`}>
                <Form.Label>Value</Form.Label>
                <Form.Control type="text" value={expression.value} onChange={(e) => handleExpressionChange(index, 'value', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`score${index}`}>
                <Form.Label>Score</Form.Label>
                <Form.Control type="text" value={expression.score} onChange={(e) => handleExpressionChange(index, 'score', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => deleteExpression(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))}

        <Button variant="primary" onClick={addExpression}>
          Add Expression
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

// Export the component
export default ExpressionEngineUI;
