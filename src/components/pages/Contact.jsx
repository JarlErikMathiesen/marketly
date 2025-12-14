import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #faf9f6;
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
`;

const FormWrapper = styled.form`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Heading = styled.h1`
  margin-bottom: 1.5rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 140px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.9rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gold};
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters'),
  subject: yup
    .string()
    .trim()
    .required('Subject is required')
    .min(3, 'Subject must be at least 3 characters'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  body: yup
    .string()
    .trim()
    .required('Message is required')
    .min(3, 'Message must be at least 3 characters'),
});

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <PageWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Heading>Contact</Heading>

        <FieldGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register('fullName')} />
          {errors.fullName && (
            <ErrorMessage>{errors.fullName.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" {...register('subject')} />
          {errors.subject && (
            <ErrorMessage>{errors.subject.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="body">Message</Label>
          <TextArea id="body" {...register('body')} />
          {errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
        </FieldGroup>

        <SubmitButton type="submit">Send Message</SubmitButton>
      </FormWrapper>
    </PageWrapper>
  );
}
