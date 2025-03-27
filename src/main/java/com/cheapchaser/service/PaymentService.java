package com.cheapchaser.service;

import com.cheapchaser.model.PaymentRequest;
import com.cheapchaser.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public PaymentRequest createPayment(PaymentRequest paymentRequest) {
        return paymentRepository.save(paymentRequest);
    }
}
