"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  useTheme,
  ThemeProvider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ModeToggle } from '../../components/mode-toggle';
import { useRouter } from 'next/navigation';
import { useTheme as useNextTheme } from 'next-themes';
import theme, { darkTheme } from '../theme';

// Navigation items
const navigation = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

// Wizard steps
const steps = [
  { key: 'use_case', label: 'What is your use case?', type: 'text' },
  { key: 'cost_profile', label: 'Select your cost profile', type: 'select', options: ['Cost-Optimized', 'Balanced', 'High-Budget'] },
  { key: 'scalability', label: 'Select the scalability required', type: 'select', options: ['Low', 'Medium', 'High'] },
  { key: 'ease_of_implementation', label: 'How easy should implementation be?', type: 'select', options: ['Easy', 'Moderate', 'Complex'] },
  { key: 'integration_complexity', label: 'Select integration complexity', type: 'select', options: ['Low', 'Moderate', 'High'] },
  { key: 'required_expertise', label: 'Required team expertise', type: 'select', options: ['Beginner', 'Intermediate', 'Expert'] },
  { key: 'security_tier', label: 'Select security tier', type: 'select', options: ['Basic', 'Advanced', 'Enterprise'] },
  { key: 'performance', label: 'What level of performance is required?', type: 'select', options: ['Standard', 'High Performance'] },
  { key: 'availability', label: 'Select availability needs', type: 'select', options: ['Single region', 'Single AZ', 'Multi-region', 'Fault tolerant'] },
  { key: 'compliance_choice', label: 'Select compliance option', type: 'select', options: ['Standard', 'Some Compliances', 'Other'] },
  { key: 'implementation_time', label: 'Desired implementation time', type: 'select', options: ['Short (days)', 'Medium (weeks)', 'Long (months)'] },
];

// Initial form values
const initialValues: Record<string, string> = {};
steps.forEach(step => initialValues[step.key] = '');
initialValues['compliance_text'] = '';

// Task output labels
const taskNames: Record<string, string> = {
  requirements_analysis: 'Requirements Analysis',
  software_architecture: 'Software Architecture',
  aws_service_selection: 'AWS Service Selection',
  security_architecture: 'Security Architecture',
  cost_optimization: 'Cost Optimization',
  data_architecture: 'Data Architecture',
  devops_implementation: 'DevOps Implementation',
  integration_architecture: 'Integration Architecture',
  architecture_validation: 'Architecture Validation',
  final_synthesis: 'Final Synthesis',
};

type TaskOutputs = Record<keyof typeof taskNames, string>;
type ResultData = { task_outputs: TaskOutputs };

export default function WizardForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultData|null>(null);
  const router = useRouter();
  const { theme: nextTheme } = useNextTheme();
  const muiTheme = useTheme();
  const [resultTab, setResultTab] = useState(0);

  const handleResultTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setResultTab(newValue);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show compliance text if 'Other'
  const getVisibleSteps = (values: Record<string,string>) => {
    const list = [...steps];
    if (values.compliance_choice === 'Other') {
      list.splice(10,0,{ key:'compliance_text', label:'Please specify compliance', type:'text' });
    }
    return list;
  };

  const handleSubmit = async (values: Record<string,string>, { setSubmitting }:any) => {
    setLoading(true);
    const data: any = {...values};
    data.compliance = [values.compliance_choice!=='Other'?values.compliance_choice:values.compliance_text];
    try{
      const res = await fetch('http://localhost:8000/api/kickoff',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const json = await res.json();
      if(json.success) setResult({ task_outputs: json.result.task_outputs });
    }catch(e){ console.error(e); }
    setLoading(false);
    setSubmitting(false);
  };

  const renderOutputs = () => (
    result?
    <Paper sx={{
      p: 3, 
      mt: 4, 
      borderRadius: 2, 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <Typography variant='h5' sx={{ mb: 2, fontWeight: 600 }}>Results</Typography>
      {Object.entries(result.task_outputs).map(([k,v])=> (
        <Accordion key={k} sx={{ 
          mb: 1, 
          '&:before': { display: 'none' },
        }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(147, 51, 234, 0.1)',
              }
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>{taskNames[k]}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component='pre' sx={{ 
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              backgroundColor: 'rgba(147, 51, 234, 0.05)',
              padding: 2,
              borderRadius: 1
            }}>
              {v}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>:null
  );

  return (
    <ThemeProvider theme={nextTheme === 'dark' ? darkTheme : theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default'
      }}>
        <AppBar 
          position="static" 
          color="default" 
          elevation={1} 
          sx={{ 
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="outlined"
              color="inherit"
              endIcon={<ChevronRight />}
              onClick={handleLogout}
              sx={{ 
                mr: 2,
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(147, 51, 234, 0.1)',
                }
              }}
            >
              Log out
            </Button>
            <ModeToggle />
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              backgroundColor: 'background.paper',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, handleChange, isSubmitting, errors, touched }) => {
                const visible = getVisibleSteps(values);
                return (
                  <Form>
                    <Box mb={4}>
                      <Stepper 
                        activeStep={activeStep} 
                        orientation='vertical'
                        sx={{
                          '& .MuiStepLabel-root': {
                            padding: '8px 0',
                          },
                          '& .MuiStepLabel-label': {
                            fontSize: '1rem',
                            fontWeight: 500,
                          },
                          '& .MuiStepContent-root': {
                            paddingLeft: '32px',
                          }
                        }}
                      >
                        {visible.map((s,idx)=>(
                          <Step key={s.key} completed={!!values[s.key]}>
                            <StepLabel 
                              onClick={()=>setActiveStep(idx)} 
                              sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                  color: 'primary.main',
                                }
                              }}
                            >
                              {s.label}
                            </StepLabel>
                            <StepContent>
                              {s.type==='text'?
                                <TextField 
                                  fullWidth 
                                  name={s.key} 
                                  label={s.label} 
                                  value={values[s.key]} 
                                  onChange={handleChange} 
                                  error={!!(errors[s.key]&&touched[s.key])} 
                                  helperText={errors[s.key]&&touched[s.key]?errors[s.key]:''}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '8px',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: 'divider',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                      borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                      borderColor: 'primary.main',
                                    }
                                  }}
                                />
                              :
                                <TextField 
                                  select 
                                  fullWidth 
                                  name={s.key} 
                                  label={s.label} 
                                  value={values[s.key]} 
                                  onChange={handleChange} 
                                  error={!!(errors[s.key]&&touched[s.key])} 
                                  helperText={errors[s.key]&&touched[s.key]?errors[s.key]:''}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '8px',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: 'divider',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                      borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                      borderColor: 'primary.main',
                                    }
                                  }}
                                >
                                  <MenuItem value=''>--Select--</MenuItem>
                                  {s.options?.map(o=><MenuItem key={o} value={o}>{o}</MenuItem>)}
                                </TextField>
                              }
                              <Box sx={{mt: 3, mb: 2, display:'flex', justifyContent:'space-between'}}>
                                <Button 
                                  disabled={idx===0} 
                                  onClick={()=>setActiveStep(prev=>prev-1)}
                                  sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                      backgroundColor: 'rgba(147, 51, 234, 0.1)',
                                    }
                                  }}
                                >
                                  Back
                                </Button>
                                <Button 
                                  variant='contained' 
                                  disabled={!values[s.key]||idx===visible.length-1} 
                                  onClick={()=>setActiveStep(prev=>prev+1)}
                                >
                                  Next
                                </Button>
                              </Box>
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                      <Button 
                        type='submit' 
                        variant='contained' 
                        disabled={isSubmitting||visible.some(v=>!values[v.key])}
                      >
                        Generate
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Paper>
          {renderOutputs()}
        </Container>

        <Backdrop 
          open={loading} 
          sx={{
            color:'#fff',
            zIndex:1000,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
        >
          <CircularProgress color='inherit'/>
        </Backdrop>
      </Box>
    </ThemeProvider>
  );
}
