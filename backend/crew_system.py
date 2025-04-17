# backend/crew_system.py
import os
from crewai import Process, Crew, Agent, Task
from crewai_tools import SerperDevTool
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI  # Included per your original notebook

# Load environment variables
load_dotenv()

# Tool initialization
search_tool = SerperDevTool()

# Define Agents

knowledge_agent = Agent(
    role="AWS Documentation Specialist",
    goal="Retrieve and synthesize comprehensive AWS documentation tailored specifically to the {use_case}",
    backstory=(
        "You are an AWS certified Solutions Architect with 10+ years of experience specializing in AWS documentation. "
        "You're tasked with gathering detailed information for a {cost_profile} solution with {scalability} scalability needs "
        "and {security_tier} security requirements that must achieve {performance} performance while maintaining {availability}. "
        "The solution must address the specific challenges of implementing a {use_case}. "
        "You understand that this {implementation_time} timeline project requires {ease_of_implementation} implementation with "
        "{required_expertise} AWS expertise level. The solution must comply with {compliance} requirements. "
        "Your job is to find and extract the most relevant AWS documentation, white papers, implementation guides, and "
        "reference architectures that specifically address these exact requirements for this use case."
    ),
    allow_delegation=False,
    verbose=True,
)

industry_solutions_agent = Agent(
    role="Industry Solutions Expert",
    goal="Identify industry-specific AWS patterns and real-world case studies that align with implementing {use_case}",
    backstory=(
        "You are an AWS Technical Account Manager specializing in {use_case} implementations. "
        "You have extensive experience with projects that require {cost_profile} optimization, "
        "{scalability} scaling capabilities, and {security_tier} security controls. "
        "Your expertise is particularly valuable for implementations needing {availability} across regions "
        "while meeting {performance} requirements. You focus exclusively on how real companies have implemented "
        "similar solutions that had to comply with {compliance} regulations. You understand the practical challenges "
        "of achieving {ease_of_implementation} implementation with {integration_complexity} integration complexity "
        "given {required_expertise} expertise level, especially when working within a {implementation_time} timeframe. "
        "Your value comes from finding concrete examples that match these exact parameters rather than generic solutions."
    ),
    allow_delegation=True,
    verbose=True,
)

implementation_details_agent = Agent(
    role="Implementation Architect",
    goal="Create detailed implementation specifications and code examples for a {use_case} with {cost_profile} cost profile",
    backstory=(
        "You are a hands-on AWS implementation specialist who excels at developing {security_tier} secure solutions "
        "that deliver {performance} performance with {availability} reliability. Your specialty is converting high-level "
        "architectures into executable code, especially for {use_case} implementations. "
        "You understand that the client needs {ease_of_implementation} implementation complexity with {integration_complexity} "
        "integration requirements, given their {required_expertise} AWS expertise level. "
        "Your implementations must scale to {scalability} levels and be deployable within a {implementation_time} timeline. "
        "Every solution you create includes detailed IAM policies, networking configurations, and service settings "
        "tailored to meet {compliance} requirements. You search for and adapt real-world code examples from GitHub "
        "and AWS samples that match these exact requirements, providing implementation steps that are appropriate for "
        "the client's expertise level while meeting all their technical requirements."
    ),
    allow_delegation=True,
    verbose=True,
)

constraints_agent = Agent(
    role="Technical Constraints Specialist",
    goal="Identify implementation limitations and challenges for {use_case} with {security_tier} security and {compliance} compliance",
    backstory=(
        "You are an AWS technical specialist who focuses exclusively on practical limitations and edge cases that "
        "impact real-world {use_case} implementations. You have deep knowledge of how service quotas and technical "
        "constraints affect solutions that require {scalability} scalability and {performance} performance while "
        "maintaining {availability}. You understand the specific challenges of implementing {cost_profile} solutions "
        "that must meet {security_tier} security standards and {compliance} compliance requirements. "
        "Your expertise is particularly valuable for projects with {implementation_time} timelines and teams with "
        "{required_expertise} expertise levels who need {ease_of_implementation} implementation approaches. "
        "For each component in an architecture, you identify quotas, limits, integration challenges, and "
        "region-specific constraints that could affect implementation success, along with specific workarounds."
    ),
    allow_delegation=True,
    verbose=True,
)

qa_validation_agent = Agent(
    role="Solution Validation Expert",
    goal="Critically evaluate {use_case} architectures against {cost_profile}, {scalability}, {security_tier}, and {performance} requirements",
    backstory=(
        "You are a senior AWS consultant who specializes in pre-implementation validation for {use_case} solutions. "
        "Your responsibility is to identify gaps or suboptimal choices in proposed architectures, ensuring they truly "
        "deliver {performance} performance with {availability} while maintaining {cost_profile} cost efficiency. "
        "You have deep expertise in evaluating solutions against {compliance} requirements and {security_tier} security standards. "
        "You understand the practical implementation challenges teams with {required_expertise} expertise face "
        "when implementing solutions with {integration_complexity} integration complexity, especially on "
        "{implementation_time} timelines. You're not satisfied with generic 'best practices' - you challenge every "
        "architectural decision to ensure it's the optimal choice for these specific requirements."
    ),
    allow_delegation=True,
    verbose=True,
)

architecture_synthesizer = Agent(
    role="Lead Solutions Architect",
    goal="Create an implementation-ready AWS architecture document for {use_case} with detailed deployment instructions",
    backstory=(
        "You are a senior AWS Solutions Architect specializing in {use_case} implementations that require "
        "{performance} performance and {availability} availability. You excel at creating {cost_profile} solutions "
        "that can scale to {scalability} levels while maintaining {security_tier} security standards and meeting "
        "{compliance} compliance requirements. You understand the challenges of delivering solutions with "
        "{ease_of_implementation} implementation complexity and {integration_complexity} integration needs, "
        "especially for teams with {required_expertise} expertise working on {implementation_time} timelines. "
        "Your implementation documents include actual code examples, detailed configuration guides, step-by-step "
        "deployment instructions, and operational guidance that transforms architectural concepts into executable reality. "
        "Your solutions are consultant-grade, providing all the detail necessary for successful implementation rather "
        "than just high-level guidance."
    ),
    allow_delegation=False,
    verbose=True,
)

# Define Tasks

task_knowledge_retrieval = Task(
    description=(
        "Research and synthesize AWS documentation specifically for implementing a {use_case} that meets these requirements:\n"
        "- Cost profile: {cost_profile}\n"
        "- Scalability needs: {scalability}\n"
        "- Security requirements: {security_tier}\n"
        "- Performance needs: {performance}\n"
        "- Availability requirements: {availability}\n"
        "- Compliance requirements: {compliance}\n"
        "- Implementation timeline: {implementation_time}\n"
        "- Implementation ease: {ease_of_implementation}\n"
        "- Integration complexity: {integration_complexity}\n"
        "- Team expertise level: {required_expertise}\n\n"
        "Provide specific AWS documentation links and configuration details."
    ),
    expected_output=(
        "A comprehensive knowledge base specifically for {use_case} implementation that includes:\n"
        "- Core AWS services recommended with configuration details\n"
        "- Integration patterns optimized for {cost_profile} and {performance}\n"
        "- Security configurations for {security_tier} and {compliance}\n"
        "- Scaling mechanisms for {scalability} and {availability}\n"
        "- Implementation approaches suitable for {required_expertise} teams on {implementation_time} timelines\n"
        "- Direct references to AWS documentation"
    ),
    agent=knowledge_agent,
    tools=[search_tool],
)

task_industry_solutions = Task(
    description=(
        "Research and analyze real-world implementations of {use_case} solutions that meet these specific requirements:\n"
        "- Cost profile: {cost_profile}\n"
        "- Scalability needs: {scalability}\n"
        "- Security requirements: {security_tier}\n"
        "- Performance needs: {performance}\n"
        "- Availability requirements: {availability}\n"
        "- Compliance requirements: {compliance}\n"
        "- Implementation timeline: {implementation_time}\n\n"
        "For each relevant case study or reference architecture:\n"
        "1. Document the exact AWS services and configurations used\n"
        "2. Detail how the solution addressed requirements similar to our parameters\n"
        "3. Extract specific implementation decisions that enabled success\n"
        "4. Identify optimization patterns for cost or performance improvements\n"
        "5. Note any implementation challenges and how they were overcome"
    ),
    expected_output=(
        "A detailed analysis of real-world {use_case} implementations that includes:\n"
        "- Specific customer case studies\n"
        "- Technical architecture details\n"
        "- How implementations achieved {cost_profile}, {scalability}, {security_tier} requirements\n"
        "- Configuration choices for {performance} and {availability}\n"
        "- Lessons learned and optimization techniques"
    ),
    agent=industry_solutions_agent,
    tools=[search_tool],
)

task_implementation_details = Task(
    description=(
        "Develop detailed implementation specifications for a {use_case} solution that meets these requirements:\n"
        "- Cost profile: {cost_profile}\n"
        "- Scalability needs: {scalability}\n"
        "- Security tier: {security_tier}\n"
        "- Performance needs: {performance}\n"
        "- Availability requirements: {availability}\n"
        "- Compliance requirements: {compliance}\n"
        "- Implementation timeline: {implementation_time}\n"
        "- Team expertise level: {required_expertise}\n\n"
        "For each major component:\n"
        "1. Provide infrastructure-as-code templates (CloudFormation, Terraform, or CDK)\n"
        "2. Include AWS CLI commands or SDK code snippets for setup and configuration\n"
        "3. Detail IAM policies and security configurations\n"
        "4. Include network configuration details\n"
        "5. Provide service-specific parameter settings"
    ),
    expected_output=(
        "A detailed implementation guide for {use_case} that includes:\n"
        "- Infrastructure-as-code templates for all major components\n"
        "- AWS CLI commands and SDK code snippets for configuration\n"
        "- Complete IAM policy documents\n"
        "- Networking and security configurations\n"
        "- Service parameter settings optimized for {cost_profile} and {scalability}\n"
        "- Step-by-step deployment instructions"
    ),
    agent=implementation_details_agent,
    tools=[search_tool],
)

task_constraints_analysis = Task(
    description=(
        "Identify all technical constraints and limitations for a {use_case} implementation with these requirements:\n"
        "- Cost profile: {cost_profile}\n"
        "- Scalability needs: {scalability}\n"
        "- Security tier: {security_tier}\n"
        "- Performance needs: {performance}\n"
        "- Availability requirements: {availability}\n"
        "- Compliance requirements: {compliance}\n"
        "- Implementation timeline: {implementation_time}\n\n"
        "For each component:\n"
        "1. Document service quotas and limits\n"
        "2. Identify potential performance bottlenecks\n"
        "3. Detail integration challenges\n"
        "4. Outline region-specific considerations\n"
        "5. Document technical constraints with suggested workarounds"
    ),
    expected_output=(
        "A comprehensive constraints analysis for {use_case} implementation that includes:\n"
        "- Service quotas and limits\n"
        "- Performance constraints and solutions\n"
        "- Integration challenges and workarounds\n"
        "- Region-specific considerations for {availability}\n"
        "- Technical constraints related to {compliance}\n"
        "- Specific workarounds for each constraint"
    ),
    agent=constraints_agent,
    tools=[search_tool],
)

task_validation = Task(
    description=(
        "Critically evaluate the proposed {use_case} architecture against these requirements:\n"
        "- Cost profile: {cost_profile}\n"
        "- Scalability needs: {scalability}\n"
        "- Security tier: {security_tier}\n"
        "- Performance needs: {performance}\n"
        "- Availability requirements: {availability}\n"
        "- Compliance requirements: {compliance}\n"
        "- Implementation timeline: {implementation_time}\n"
        "- Implementation ease: {ease_of_implementation}\n"
        "- Integration complexity: {integration_complexity}\n"
        "- Team expertise level: {required_expertise}\n\n"
        "For each component and decision:\n"
        "1. Verify alignment with the requirements\n"
        "2. Evaluate against the AWS Well-Architected Framework\n"
        "3. Identify any suboptimal choices\n"
        "4. Suggest specific improvements\n"
        "5. Validate that implementation details are complete and technically sound"
    ),
    expected_output=(
        "A detailed validation report that includes:\n"
        "- Analysis of how each component meets the specific {use_case} requirements\n"
        "- Evaluation based on AWS Well-Architected Framework principles\n"
        "- Identification of suboptimal choices\n"
        "- Specific architectural improvements and implementation suggestions\n"
        "- Verification of implementation detail completeness for {required_expertise} teams on {implementation_time} timelines"
    ),
    agent=qa_validation_agent,
    tools=[search_tool],
)

task_architecture_synthesis = Task(
    description=(
        "Create a comprehensive, implementation-ready AWS architecture document for a {use_case} with these requirements:\n"
        "- Cost profile: {cost_profile}\n"
        "- Scalability needs: {scalability}\n"
        "- Security tier: {security_tier}\n"
        "- Performance needs: {performance}\n"
        "- Availability requirements: {availability}\n"
        "- Compliance requirements: {compliance}\n"
        "- Implementation timeline: {implementation_time}\n"
        "- Implementation ease: {ease_of_implementation}\n"
        "- Integration complexity: {integration_complexity}\n"
        "- Team expertise level: {required_expertise}\n\n"
        "The document must include:\n"
        "1. Executive summary relating the architecture to the use case\n"
        "2. A detailed architecture diagram with all components and interactions\n"
        "3. Component-by-component implementation specifications including service configurations and integration details\n"
        "4. A step-by-step deployment plan with code examples and configuration files\n"
        "5. Implementation timeline and resource requirements\n"
        "6. Operational guidance and monitoring setup\n"
        "7. Cost estimation based on the {cost_profile} requirements\n"
        "It should be structured as an implementation-ready consultant’s guide."
    ),
    expected_output=(
        "A comprehensive AWS architecture implementation document for {use_case} that includes:\n"
        "- Executive summary tied to the specific requirements\n"
        "- Detailed architecture diagram\n"
        "- Component-specific implementation specifications\n"
        "- Complete implementation code and configuration files\n"
        "- A step-by-step deployment guide\n"
        "- Timeline and resource requirements\n"
        "- Operational and monitoring guidance\n"
        "- Cost estimation"
    ),
    agent=architecture_synthesizer
)

# Build the Crew
crew = Crew(
    agents=[
        knowledge_agent,
        industry_solutions_agent,
        implementation_details_agent,
        constraints_agent,
        qa_validation_agent,
        architecture_synthesizer
    ],
    tasks=[
        task_knowledge_retrieval,
        task_industry_solutions,
        task_implementation_details,
        task_constraints_analysis,
        task_validation,
        task_architecture_synthesis
    ],
    process=Process.sequential,
    verbose=2,
)

def kickoff_process(user_requirements: dict) -> str:
    """
    Accepts a dictionary of user requirements and triggers the Crew AI process.
    Returns the result as a string.
    """
    return crew.kickoff(inputs=user_requirements)

if __name__ == "__main__":
    # Example user input for testing
    user_requirements = {
        'cost_profile': "Cost-Optimized",
        'scalability': "Medium",
        'ease_of_implementation': "Easy",
        'integration_complexity': "Moderate",
        'required_expertise': "Intermediate",
        'use_case': "AI-powered customer support chatbot",
        'security_tier': "Enterprise",
        'performance': "High Performance",
        'availability': "High Availability (multi-region)",
        'compliance': ["GDPR", "HIPAA"],
        'implementation_time': "Short (days)"
    }
    result = kickoff_process(user_requirements)
    print(result)
