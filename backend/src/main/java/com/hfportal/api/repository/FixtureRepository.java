package com.hfportal.api.repository;

import com.hfportal.api.model.Fixture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FixtureRepository extends JpaRepository<Fixture, Integer> {
    List<Fixture> findByLeagueId(int leagueId);

}
