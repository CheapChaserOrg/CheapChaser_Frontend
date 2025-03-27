package com.cheapchaser.repository;

import com.cheapchaser.model.PaymentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentRequest, Long> {
}
