package katas.evenChecker;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

class EvenCheckerTest {
    private EvenChecker evenChecker;

    @BeforeEach()
    public void setUp() {
        evenChecker = new EvenChecker();
    }

    @Test()
    public void should_ReturnFalse_IfNumberIsNotEven() {
        evenChecker.add(3);

        Assertions.assertFalse(evenChecker.isEven());
    }

    @Test()
    public void should_ReturnTrue_IfNumberIsEven() {
        evenChecker.add(2);

        Assertions.assertTrue(evenChecker.isEven());
    }



}