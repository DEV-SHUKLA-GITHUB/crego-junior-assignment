import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const ExpressionEngineUI = () => {
  const [connectorType, setConnectorType] = useState('and');
  const [expressions, setExpressions] = useState([
    {
      ruleType: 'Age',
      operator: '>=',
      value: '',
      score: '',
    },
  ]);
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleConnectorTypeChange = (e) => {
    setConnectorType(e.target.value);
  };

  const handleExpressionChange = (index, field, value) => {
    const newExpressions = [...expressions];
    newExpressions[index][field] = value;
    setExpressions(newExpressions);
  };

  const addExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>=', value: '', score: '' }]);
  };

  const deleteExpression = (index) => {
    const newExpressions = [...expressions];
    newExpressions.splice(index, 1);
    setExpressions(newExpressions);
  };

  const handleSubmit = () => {
    const output = {
      rules: expressions.map((expression) => ({
        key: expression.ruleType.toLowerCase().replace(/\s/g, '_'),
        output: {
          value: expression.value,
          operator: expression.operator,
          score: expression.score,
        },
      })),
      combinator: connectorType.toLowerCase(),
    };

    setJsonOutput(JSON.stringify(output, null, 2));
  };

  return (
<Container>
      <h2 className="mb-4 text-center">Expression Engine</h2>
      <Card className="p-4 mb-4" style={{ background: 'linear-gradient(to right, #74ebd5, #ACB6E5)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Form>
          <Form.Group controlId="connectorType" className='mb-2'>
            <Form.Label>Connector Type</Form.Label>
            <Form.Control as="select" value={connectorType} onChange={handleConnectorTypeChange}>
              <option value="and">AND</option>
              <option value="or">OR</option>
            </Form.Control>
          </Form.Group>

          {expressions.map((expression, index) => (
            <Row key={index} className="mb-3">
              <Col xs={3}>
                <Form.Group controlId={`ruleType${index}`}>
                  <Form.Label>Rule Type</Form.Label>
                  <Form.Control as="select" value={expression.ruleType} onChange={(e) => handleExpressionChange(index, 'ruleType', e.target.value)}>
                    <option value="Age">Age</option>
                    <option value="Credit Score">Credit Score</option>
                    <option value="Account Balance">Account Balance</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={2}>
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
              <Col xs={2}>
                <Form.Group controlId={`value${index}`}>
                  <Form.Label>Value</Form.Label>
                  <Form.Control type="text" value={expression.value} onChange={(e) => handleExpressionChange(index, 'value', e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={2}>
                <Form.Group controlId={`score${index}`}>
                  <Form.Label>Score</Form.Label>
                  <Form.Control type="text" value={expression.score} onChange={(e) => handleExpressionChange(index, 'score', e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={2} className="d-flex align-items-end">
                <Button variant="danger" onClick={() => deleteExpression(index)}>
                  Delete
                </Button>
              </Col>
            </Row>
          ))}

          <Button variant="primary" onClick={addExpression}>
            Add Expression
          </Button>

          <Button variant="success" onClick={handleSubmit} className="m-4">
            Submit
          </Button>
        </Form>
      </Card>

      {jsonOutput && (
        <Card className="p-4" style={{ background: 'linear-gradient(to right, #5E7F5E, #79D7ED)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h5 className="text-white">JSON Output</h5>
          <Alert variant="success">
            <pre className="text-black">{jsonOutput}</pre>
          </Alert>
        </Card>
      )}
    </Container>
  );
};

export default ExpressionEngineUI;
