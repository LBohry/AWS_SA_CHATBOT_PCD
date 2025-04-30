"use client";

import { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  Box,
  Button,
  Step,
  StepLabel,
  StepContent,
  Stepper,
  TextField,
  MenuItem,
  Paper,
  CircularProgress,
  Backdrop,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Define our step structure
const steps = [
  { key: "use_case", label: "What is your use case?", type: "text" },
  {
    key: "cost_profile",
    label: "Select your cost profile",
    type: "select",
    options: ["Cost-Optimized", "Balanced", "High-Budget"],
  },
  {
    key: "scalability",
    label: "Select the scalability level required",
    type: "select",
    options: ["Low", "Medium", "High"],
  },
  {
    key: "ease_of_implementation",
    label: "How easy should the implementation be?",
    type: "select",
    options: ["Easy", "Moderate", "Complex"],
  },
  {
    key: "integration_complexity",
    label: "Select integration complexity",
    type: "select",
    options: ["Low", "Moderate", "High"],
  },
  {
    key: "required_expertise",
    label: "Required team expertise",
    type: "select",
    options: ["Beginner", "Intermediate", "Expert"],
  },
  {
    key: "security_tier",
    label: "Select the security tier",
    type: "select",
    options: ["Basic", "Advanced", "Enterprise"],
  },
  {
    key: "performance",
    label: "What level of performance is required?",
    type: "select",
    options: ["Standard", "High Performance"],
  },
  {
    key: "availability",
    label: "Select availability needs",
    type: "select",
    options: [
      "Single region",
      "Single AZ",
      "Highly available (multi-region)",
      "Fault tolerant"
    ]
  },  
  {
    key: "compliance_choice",
    label: "Select compliance option",
    type: "select",
    options: ["Standard", "Some Compliances", "Other"],
  },
  {
    key: "implementation_time",
    label: "Desired implementation time",
    type: "select",
    options: ["Short (days)", "Medium (weeks)", "Long (months)"],
  },
];

// Initialize empty form values
const initialValues: Record<string, string> = {};
steps.forEach((step) => {
  initialValues[step.key] = "";
});
// Add compliance_text for the conditional field
initialValues["compliance_text"] = "";

// Interface for the results
interface TaskOutputs {
  requirements_analysis: string;
  software_architecture: string;
  aws_service_selection: string;
  security_architecture: string;
  cost_optimization: string;
  data_architecture: string;
  devops_implementation: string;
  integration_architecture: string;
  architecture_validation: string;
  final_synthesis: string;
}

interface ResultData {
  architecture_recommendation: any;
  task_outputs: TaskOutputs;
}

export default function WizardForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [resultTab, setResultTab] = useState(0);

  // Simple function to check if we should show the compliance text field
  const shouldShowComplianceText = (values: Record<string, string>) => {
    return values.compliance_choice === "Other";
  };

  const handleResultTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setResultTab(newValue);
  };

  // Handle form submission
  const handleSubmit = async (
    values: Record<string, string>,
    helpers: FormikHelpers<Record<string, string>>
  ) => {
    setLoading(true);

    // Format the data for the API
    const data: Record<string, any> = { ...values };

    // Process compliance field
    if (values.compliance_choice !== "Other") {
      data.compliance = [values.compliance_choice];
    } else {
      data.compliance = [values.compliance_text];
    }

    console.log("Submitting form data to API:", data);
    try {
      const response = await fetch("http://localhost:8000/api/kickoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success) {
        setResult(resData.result);
      } else {
        console.error("API returned error:", resData);
        setResult(null);
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setResult(null);
    } finally {
      setLoading(false);
      helpers.setSubmitting(false);
    }
  };

  // Handle moving to next step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle going back to previous step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Create a copy of steps with the conditional compliance text field if needed
  const getVisibleSteps = (values: Record<string, string>) => {
    const visibleSteps = [...steps];

    // Add compliance_text step if "Other" is selected
    if (values.compliance_choice === "Other") {
      visibleSteps.splice(10, 0, {
        key: "compliance_text",
        label: "Please specify your compliance requirements",
        type: "text",
      });
    }

    return visibleSteps;
  };

  // Render the task outputs
  const renderTaskOutputs = () => {
    if (!result || !result.task_outputs) return null;

    const taskOutputs = result.task_outputs;
    const taskNames = {
      requirements_analysis: "Requirements Analysis",
      software_architecture: "Software Architecture",
      aws_service_selection: "AWS Service Selection",
      security_architecture: "Security Architecture",
      cost_optimization: "Cost Optimization",
      data_architecture: "Data Architecture",
      devops_implementation: "DevOps Implementation",
      integration_architecture: "Integration Architecture",
      architecture_validation: "Architecture Validation",
      final_synthesis: "Final Synthesis",
    };

    return (
      <Box sx={{ width: "100%" }}>
        {Object.entries(taskOutputs).map(([key, output]) => (
          <Accordion key={key}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {taskNames[key as keyof typeof taskNames] || key}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  backgroundColor: "#f5f5f5", 
                  maxHeight: "400px", 
                  overflow: "auto" 
                }}
              >
                <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{output}</pre>
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  // Render the final recommendation
  const renderFinalRecommendation = () => {
    if (!result || !result.architecture_recommendation) return null;

    return (
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          backgroundColor: "#f5f5f5", 
          maxHeight: "600px", 
          overflow: "auto" 
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
          {typeof result.architecture_recommendation === 'string' 
            ? result.architecture_recommendation 
            : JSON.stringify(result.architecture_recommendation, null, 2)
          }
        </pre>
      </Paper>
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, isSubmitting, handleChange, errors, touched }) => {
        const visibleSteps = getVisibleSteps(values);
        const isLastStep = activeStep === visibleSteps.length - 1;

        // Check if current step is filled
        const isStepComplete =
          visibleSteps[activeStep] &&
          values[visibleSteps[activeStep].key] !== "";

        // Check if all steps are complete for the submit button
        const isFormComplete = visibleSteps.every(
          (step) => values[step.key] !== ""
        );

        return (
          <Form>
            <Box sx={{ mb: 4 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {visibleSteps.map((step, index) => (
                  <Step
                    key={step.key}
                    completed={values[step.key] !== ""}
                    active={index === activeStep}
                  >
                    <StepLabel
                      onClick={() => setActiveStep(index)}
                      sx={{ cursor: "pointer" }}
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      {step.type === "text" ? (
                        <TextField
                          fullWidth
                          name={step.key}
                          label={step.label}
                          value={values[step.key]}
                          onChange={handleChange}
                          margin="normal"
                          error={!!(errors[step.key] && touched[step.key])}
                          helperText={
                            errors[step.key] && touched[step.key]
                              ? errors[step.key]
                              : ""
                          }
                        />
                      ) : (
                        <TextField
                          select
                          fullWidth
                          name={step.key}
                          label={step.label}
                          value={values[step.key]}
                          onChange={handleChange}
                          margin="normal"
                          error={!!(errors[step.key] && touched[step.key])}
                          helperText={
                            errors[step.key] && touched[step.key]
                              ? errors[step.key]
                              : ""
                          }
                        >
                          <MenuItem value="">--Select an option--</MenuItem>
                          {(step.options || []).map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}

                      <Box
                        sx={{
                          mb: 2,
                          mt: 1,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button onClick={handleBack} disabled={index === 0}>
                          Back
                        </Button>

                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={!isStepComplete || isLastStep}
                        >
                          Next
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Submit button outside stepper */}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isFormComplete || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Box>

            {/* Loading overlay */}
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            {/* Results display */}
            {result && (
              <Paper square elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                  AWS Architecture Recommendation
                </Typography>
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs 
                    value={resultTab} 
                    onChange={handleResultTabChange}
                    aria-label="result tabs"
                  >
                    <Tab label="Final Recommendation" />
                    <Tab label="Detailed Task Outputs" />
                  </Tabs>
                </Box>
                
                {resultTab === 0 ? (
                  renderFinalRecommendation()
                ) : (
                  renderTaskOutputs()
                )}
              </Paper>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}